---
title: API Tokens
pageTitle: API Tokens - Account Chief docs
description: Learn about Chief Tools tokens and how to use and secure them.
---

Chief Tools tokens can be used to access the API of one or more Chief Tools without the need for your username and/or password. Tokens are managed by Account Chief.

---

## Personal Access Tokens

Personal Access Tokens (PAT for short): are used to authenticate as your user account, it has the same access as you have in our web UI. Personal Access Tokens can be created from your account, you can access it directly by going to: {% external-link href="https://account.chief.app/api/tokens?rel=chiefdocs" %}account.chief.app/api/tokens{% /external-link %}.

### Expiring tokens

When creating a token you get the option to set a date when the token expires, after this date passes the token will no longer be valid and usable, perfect for granting temporary access.

If you whish for the token to remain active indefinitly you can leave the field empty.

### Allowed applications

You can select for which Chief Tool(s) the token you create is usable, this is recommended to limit the scope of what the token can access.

If you whish for the token to be valid for all tools, don't select any.

### Revoking tokens

You can remove the token at any time, the token will be revoked immediately and will stop working right away so make sure the token is no longer in use when you do this.

---

## Token Format

We took {% external-link href="https://github.blog/2021-04-05-behind-githubs-new-authentication-token-formats/?ref=chieftools" %}inspiration{% /external-link %} from how GitHub generates their tokens and based our token format on theirs.

Our tokens are comprised of the following parts:

- tokens always start with a prefix of `ct` (Chief Tools)
- followed by a 1-4 character type indicator (see [prefixes](#prefixes))
- followed by a `_`
- followed by 30-242 characters of randomness
- followed by a 6 character base62 CRC32 checksum

A token currently cannot exceed 255 characters, although this might change in the future.

### Parsing

If you want you can use the following regex to identify and parse a Chief Tools token: 

```regex
(?<prefix>ct[a-zA-Z0-9]{1,4})_(?<random>[a-zA-Z0-9]{30,242})(?<checksum>[a-zA-Z0-9]{6})
```

We have our "random token" parser, generator and validator {% external-link href="https://github.com/chieftools/sdk/blob/02d30fc7be9bfa016fbc3ca267d620b2570318af/src/Helpers/RandomToken.php" %}open sourced{% /external-link %} as part of our internal SDK.

### Prefixes

This is a list of prefixes and what those prefixes mean:

- `ctp` for [Personal Access Tokens](#personal-access-tokens)

---

## GitHub Secret Scanning

Chief Tools tokens are part of the {% external-link href="https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning/?ref=chieftools" %}GitHub Secret Scanning{% /external-link %} program. 
This means that if you accidentally push a token to a public repository we will be notified by GitHub and immediately revoke the token.
You can read their announcement on the {% external-link href="https://github.blog/changelog/2022-10-26-chief-tools-is-now-a-github-secret-scanning-partner/?ref=chieftools" %}GitHub blog{% /external-link %}.

### What to do when a token is revoked

There are a few steps to take:

1. Validate that the token was not misused. Even though the token was only public for a short time it's possible it was maliciously used, check to make sure no unintended changes are made to your account
2. Ensure that the token is not in use currently, if it is you should issue and a new token and prevent it from being published publicly
3. Validate your processes to prevent publishing Chief Tools tokens publicly

### What information is shared with GitHub

If the token was a valid Chief Tools token we will let GitHub know that they succesfully reported a token to us, if the token was not we will let them know it was a false-positive.

No other information about the token or what it could access is shared with GitHub.

---

## GitGuardian

{% external-link href="https://www.gitguardian.com/?ref=chieftools" %}GitGuardian{% /external-link %} helps developers keep 250+ types of secrets out of their source code. 
Their automated secrets detection and remediation solution secures every step of the development life cycle, helping you monitor your code for sensitive data.

You can read more about the capabilities of {% external-link href="https://www.gitguardian.com/?ref=chieftools" %}GitGuardian{% /external-link %} scanning for Chief Tools tokens {% external-link href="https://docs.gitguardian.com/secrets-detection/detectors/specifics/chief_app_key?ref=chieftools" %}in their docs{% /external-link %}.

### What to do when GitGuardian alerts you of a token

There are a few steps to take:

1. Revoke the token from your user account {% external-link href="https://account.chief.app/api/tokens?ref=chiefdocs" %}here{% /external-link %}.
2. Validate that the token was not misused. Even though the token was only public for a short time it's possible it was maliciously used, check to make sure no unintended changes are made to your account
3. Ensure that the token is not in use currently, if it is you should issue and a new token and prevent it from being published publicly
4. Validate your processes to prevent publishing Chief Tools tokens publicly

### What information is shared with GitGuardian

No information is shared directly with {% external-link href="https://www.gitguardian.com/?ref=chieftools" %}GitGuardian{% /external-link %}, they are only scanning for tokens according to our format and alert if they think they found a token matching that format.
