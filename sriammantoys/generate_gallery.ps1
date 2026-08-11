$imagesDir = "images"
$outputFile = "js\gallery-data.js"

if (!(Test-Path -Path "js")) {
    New-Item -ItemType Directory -Path "js" | Out-Null
}

$directories = Get-ChildItem -Path $imagesDir -Directory
$items = @()

foreach ($dir in $directories) {
    $files = Get-ChildItem -Path $dir.FullName -File | Where-Object { $_.Extension -match "\.(jpg|jpeg|png|gif|webp)$" }
    foreach ($file in $files) {
        $items += [PSCustomObject]@{
            category = $dir.Name
            path = "images/" + $dir.Name + "/" + $file.Name
        }
    }
}

$jsonItems = "[]"
if ($items.Count -gt 0) {
    $jsonItems = $items | ConvertTo-Json -Depth 5
}

$jsContent = "const galleryData = $jsonItems;"
Set-Content -Path $outputFile -Value $jsContent -Encoding UTF8

Write-Host "Gallery data successfully updated with $($items.Count) images!"
