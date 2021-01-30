param([String]$outputObject)
$var=ConvertFrom-Json $outputObject
$appInsights=$var.appInsights.value
Write-Host "$appInsights"
Write-Host "##vso[task.setvariable variable=appInsights;]$appInsights"