---
title: Personal Access Tokens
description: Learn about Chief Tools Personal Access Tokens and how to use and secure them.
---

Personal Access Tokens can be used to access the API of one or more Chief Tools without the need for your username and/or password.

---

## Where to create

Personal Access Tokens can be created from your account, you can access it directly by going to: [account.chief.app/api/tokens](https://account.chief.app/api/tokens).

### Expiring tokens

When creating a token you get the option to set a date when the token expires, after this date passes the token will no longer be valid and usable, perfect for granting temporary access.

If you whish for the token to remain active indefinitly you can leave the field empty.

### Allowed applications

You can select for which Chief Tool(s) the token you create is usable, this is recommended to limit the scope of what the token can access.

If you whish for the token to be valid for all tools, don't select any.

### Revoking tokens

You can remove the token at any time, the token will be revoked immediately and will stop working right away so make sure the token is no longer in use when you do this.

---

## GitHub Secret Scanning

Chief Tools tokens are part of the [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning) program. This means that if you accidentally push a token to a public repository we will be notified by GitHub and immediately revoke the token. 

### What to do when a token is revoked

There are a few steps to take:

1. Validate that the token was not misused. Even though the token was only public for a short time it's possible it was maliciously used, check to make sure no unintended changes are made to your account
2. Ensure that the token is not in use currently, if it is you should issue and a new token and prevent it from being published publicly
3. Validate your processes to prevent publishing Chief Tools tokens publicly

### What information is shared with GitHub

If the token was a valid Chief Tools token we will let GitHub know that they succesfully reported a token to us, if the token was not we will let them know it was a false-positive.

No other information about the token or what it could access is shared with GitHub.
