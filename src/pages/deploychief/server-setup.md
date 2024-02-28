---
title: Server Setup
pageTitle: Server Setup - Deploy Chief docs
description: To take full advantage of Deploy Chief a little work is needed on your side.
---

Deploy Chief offers zero downtime deployments. 
This means that your application will be available during the deployment process and will not be interrupted when a new version is deployed.

To achieve this, Deploy Chief will create a new release folder separate from your running application and run the deployment process in there.
After all deployment steps have been executed, it will be symlinked to the current release folder which is instantly available to your users. 
This means that you need to make sure that your application and webserver is able to handle this gracefully which is not always the case.

## Webserver configuration

Sometimes it is recommended when doing a zero downtime deployment to restart your webserver or even the `php-fpm` daemon, this is however not strictly necessary as long as the webserver is configured correctly.
We even strongly recommend against doing this since restarting the webserver or the `php-fpm` daemon will cause a short downtime of your application which is not very zero downtime 😉.

### NGINX

A default installation of NGINX will not be able to handle the zero downtime deployments out of the box.

By default there will be a file called `fastcgi_params` or `fastcgi.conf` in the `/etc/nginx` folder which contains the following lines:

```
fastcgi_param  SCRIPT_FILENAME    $document_root$fastcgi_script_name;
fastcgi_param  DOCUMENT_ROOT      $document_root;
```

_Note: This file might be located in a different folder depending on your operating system, if you can't find the lines you can search for it using `grep -R SCRIPT_FILENAME /etc/nginx/`._

This line will cause NGINX to serve the `index.php` file from the current release folder, however it will not see that the folder is a symlink so it `SCRIPT_FILENAME` (and `DOCUMENT_ROOT`) will be set to something like:

```
/var/www/app/production/current/public/index.php
```

PHP's OPcache will cache the file by that path. The problem with this is that when the symlink is updated to the new release folder, the `SCRIPT_FILENAME` will still be the same and PHP will still serve the cached version of the file instead of the new version.

To fix this we need to change the `SCRIPT_FILENAME` to the actual file path that is being served, which is in the release folder, we do this by changing the snippet to use the {% external-link href="https://nginx.org/en/docs/http/ngx_http_core_module.html#var_realpath_root" %}`$realpath_root`{% /external-link %} variable instead of {% external-link href="https://nginx.org/en/docs/http/ngx_http_core_module.html#var_document_root" %}`$document_root`{% /external-link %}:

```
fastcgi_param  SCRIPT_FILENAME    $realpath_root$fastcgi_script_name;
fastcgi_param  DOCUMENT_ROOT      $realpath_root;
```

This will resolve the symlink first and then set the `SCRIPT_FILENAME` (and `DOCUMENT_ROOT`) to the actual path that is being served, which is something like:

```
/var/www/app/production/releases/c5111f1f-120d-4ea2-b707-ed46952f4f2e/public/index.php
```

With this change it's no longer needed to restart the `php-fpm` deamon or NGINX after a deployment because on every deployment the release folder changes so the file is no longer cached and will be retrieved from the disk before being cached again.

### Ploi

If you are using {% external-link href="https://ploi.io/?ref=chieftools" %}Ploi{% /external-link %} to manage your servers you can use this webserver configuration template to apply the needed changes when creating your site: [Zero downtime deployment NGINX template](https://ploi.io/panel/marketplace/162-laravel-zero-downtime-deployment-nginx-template).
