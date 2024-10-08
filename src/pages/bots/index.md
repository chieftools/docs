---
title: Bots
pageTitle: Bots - Chief Tools docs
description: A quick introduction to Chief Tools bots, what they do and how you can detect them.
---

## Introduction

Many of our applications make requests to various properties on the internet for monitoring purposes or to retrieve a piece of information from a internet property.

We try to teach our bots to be good bots, but if you feel like one of our bots is misbehaving, please {% external-link href="https://chief.app/contact?rel=chiefdocs" %}contact us{% /external-link %} so we can resolve the issue!

## User Agents

Our bots will always identify themselves with a user agent that contains the string `AppName/X1X2X3X4` or `AppNameBot/X1X2X3X4` when possible.

For example, {% external-link href="https://cert.chief.app/?rel=chiefdocs" %}Cert Chief{% /external-link %} might use the following user agent when monitoring your domains:

```
CertChiefBot/X1X2X3X4 (+https://aka.chief.app/bot)
```

Or when our {% external-link href="https://favicon.chief.tools/?rel=chiefdocs" %}favicon proxy{% /external-link %} is looking for your favicon it might use the following user agent:

```
Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ChiefToolsFaviconBot/X1X2X3X4; +https://aka.chief.app/bot) Chrome/123.0.6312.58 Safari/537.36
```

_Note: The `X1X2X3X4` part will be replaced with a unique identifier for the version of the bot that is making the request, this is a dynamic value that will change over time so do not use it for detection purposes. The value might look like `040bd810` or it might look like `1.0.0`._
