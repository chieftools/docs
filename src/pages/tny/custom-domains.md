---
title: Custom Domains
pageTitle: Custom Domains - Tny docs
description: Learn how to use Custom Domains with Tny
---

Instead of using our domains, you can use your own domain with Tny. This is a feature that requires a subscription.

There are two types of custom domains:

- **Custom domain**: You can use these to create short links on your own (sub-)domain.
- **Domain redirects**: You can use these to redirect your (sub-)domain to another URL.

The setup on the domain (DNS) side is the same for both types. The only difference is how you set up the domain in the Tny dashboard.

You cannot convert a domain from one type to the other, but you can delete it and add it again as the other custom domain type.

## Setup DNS

To use a custom domain with Tny, you need to set up a `CNAME` record in your domain's DNS settings. The CNAME record should point to `custom.tny.app`.

If you want to use a root domain like `tny.app` instead of a subdomain like `links.tny.app` it depends on your DNS provider if it's possible to setup a CNAME record for the root domain. 

If it's not possible, you can setup the following A and AAAA records for your domain:

| Record Type | Record Value      |
|-------------|-------------------|
| A           | 137.66.33.47      |
| AAAA        | 2a09:8280:1::8628 |

{% callout title="Always use CNAME if possible" %}
Using A and AAAA records can cause issues if the IP address changes in the future. We recommend using a CNAME record when possible.
{% /callout %}

## Setup Custom domain

Go to the [Custom Domains](https://tny.app/team/current/domains/custom?ref=chiefdocs) page in the Tny dashboard and enter your custom (sub-)domain name and the default redirect URL.

The default redirect URL is the URL that the custom domain will redirect to if accessed directly. You can change this later.

After you've added the custom domain there are a few options to configure if you want:

### Options

#### Target (or "default redirect")

The target URL that the custom domain will redirect to if accessed directly.

#### Is selected as default domain when creating a Tny link

When enabled the custom domain will be selected by default when creating a new Tny link. This setting also affects API calls if the API call doesn't specify a custom domain.

#### Redirect to the default redirect when no link is found

When enabled the custom domain will redirect to the default redirect URL when normally a 404 Page Not Found error would be shown.

#### Include query parameters in default redirect

When enabled the query parameters of the requested URL will be included in the default redirect URL.

## Domain redirects

Go to the [Domain Redirects](https://tny.app/team/current/domains/redirects?ref=chiefdocs) page in the Tny dashboard and enter your (sub-)domain name and the target URL.

After you've added the domain redirect there are a few options to configure if you want:

### Options

#### Target (or "default redirect")

The target URL that the custom domain will redirect to.

#### Include path in redirect

When enabled the path of the requested URL will be included in the redirect URL.

#### Include query parameters in redirect
    
When enabled the query parameters of the requested URL will be included in the redirect URL.
