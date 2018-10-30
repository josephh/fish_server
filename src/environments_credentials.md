# Environments and Credentials
## AEM author
### Stage
http://stg-author.westeurope.cloudapp.azure.com/aem/start.html
Username: `jjobbings` Password: `d3cemb3r!7`

## Mail server
Smarthost is `mxa-00140e01.gslb.pphosted.com` port 25

Servers:
DEV-VM-DIS-1

STG-VM-AUT
STG-VM-PUB-1
STG-VM-PUB-2
STG-VM-DIS-1
STG-VM-DIS-2
STG-VM-RPX-1
STG-VM-RPX-2

PRD-VM-AUT-1
PRD-VM-PUB-1
PRD-VM-PUB-2
PRD-VM-DIS-1
PRD-VM-DIS-2
PRD-VM-RPX-1
PRD-VM-RPX-2

SH-VM-CBT-1
SH-VM-CBT-2

QA author 40.118.97.115 (4502) shtest / Endava54321! `ssh shtest@40.118.97.115`
QA publisher and dispatcher 13.73.158.58 (4503) shtest / Endava54321! `ssh shtest@13.73.158.58`

## SSH to VMs
### Credentials
Username: `joseph.jobbings`
Password: `TO3DLGpzxicGBtUAsSS1nbtsD7g6LEtn`

### PROD
SH-VM-CBT-1 52.233.189.215 (has access to all prod servers)
Username: `SH-VM-CBT-1-admin`
Password: `jUtha3EsU6Ayu6uxef`
$ `ssh SH-VM-CBT-1-admin@52.233.189.215`

### STAGE
SH-VM-CBT-2 104.47.149.219 (has access to all servers staging servers)
Username: `sh-vm-cbt-2-admin`
Password: `jUtha3EsU6Ayu6uxef`
$ `ssh sh-vm-cbt-2-admin@104.47.149.219`

### AEM SSL keystore credentials
AEM SSL
AEM_key_store_84231$
AEM_key_store_23196@

## Windows corporate
PC05457 (my desktop)

Still weird things going on http://stg-pub-2.westeurope.cloudapp.azure.com/system/console/vmstat - accessible on :80 but console not available on 4503

##  CLOUDFLARE
Username: `joseph.jobbings@simplyhealth` Password: `March2018`

## Object rocket
Username: `eBusiness.Mailbox@simplyhealth.co.uk` Password: `Ln3s3wj4kVhxRrMQ`

## Docker Container repo
`docker login digiplat.azurecr.io -u digiplat`
user: digiplat
password: ++/A+=/+///=2G+K+K+++=awJR6VZaXQ
