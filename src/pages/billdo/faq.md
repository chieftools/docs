---
title: Frequently asked questions
pageTitle: Frequently asked questions - Bill.DO docs
description: Answers to frequently asked questions about Bill.DO.
---

## General

### What is Bill.DO?

Bill.DO is a DigitalOcean billing monitoring tool where you can setup alerts to keep an eye on DigitalOcean spending. It also provides detailed insights in your bills and future spending.

### Why would I need Bill.DO?

DigitalOcean only shows you your current spend (updated daily) and will notify you when you rise above a certain treshold. The problem with that is that's it takes a big spreadsheet to figure out what the bill is going to be at the end of the month. And as soon as DigitalOcean sends you a notification indicating you are past a treshold, you are past it and the money is already spent. Bill.DO gives you insights and alerting to act before something happens and allows you to react before it get's out of hand by setting up alerts for predicted costs and not only spend money.

## Connecting with DigitalOcean

### How do I connect with DigitalOcean?

You can connect with DigitalOcean by going to the [Bill.DO dashboard](https://bill.do/dashboard?rel=chiefdocs) and clicking the "+ connect" button in the lower left corner. This will redirect you to DigitalOcean where you can authorize Bill.DO to access your account.

### How long does the first import take?

Importing invoices takes a few minutes, an account 24 months old with ~$1000 monthly spend should be completed in less than 30 minutes.

### The data from the first import looks, off?

This is because DigitalOcean does not provide a very detailed invoice or way to retrieve what exactly was invoiced. This means past invoices are pretty generalized and are not grouped very good, for example a Kubernetes Cluster cost is not split up in the individual nodes and load balancers so they are all mushed in droplet cost.

Going forward Bill.DO will provide a much more detailed information and will be able to provide much more detailed insights because it collects all active resources in your account and calculates spending based on that instead of what DigitalOcean provides.

## Insights

### How often is my data updated?

We update your data every hour, this means you will see your current spend and predicted spend updated every hour and resources be added and removed within the hour. This also means that if resources are active for less than an hour they might not be included in the calculations since we have not seen the resource active.

### What's currently imported/monitored?

At the moment we are monitoring: Apps, Droplets (this also includes Kubernetes Cluster nodes), Databases, Volumes, Snapshots and Load Balancers, other resources are getting skipped. If you want to see support for other resources open up or vote on our [roadmap](https://roadmap.chief.tools/projects/billdo?ref=chiefdocs).

### There is a drop in my spend at the end of the month?

You will never be billed more than the monthly cost of your Droplet (or other resource). All resources are billed hourly up to a monthly cap of 672 hours (the number of hours in 4 weeks). 
If you use your resource for fewer than 672 hours during the month, you will be billed for each hour that you used it. If you use a resource for more than 672 hours that month, you will be billed at the monthly cost. 

For example, if you spin up a $10/mo Droplet and use it for 336 hours, then you would be charged $5 (going by the hourly rate). If you use that Droplet for 700 hours, then you would be charged $10 (capped at the monthly rate).

To provide you accurate insights we calculate the spend based on the hourly rate and not the monthly rate. This means that for resources that are active a full month you will see a drop at the end of the month because you will have crossed the 672 hours treshold that month the rest is "free".

This answer was mostly copied from the [DigitalOcean FAQ](https://www.digitalocean.com/pricing?ref=chieftools).

### Credits not visible?

We do not currently show your DigitalOcean credit spend, there is no way to for us to monitor this, we can only see this in past invoices and there are no API to retrieve realtime information about this currecntly.

### Taxes not visible?

We have decided at this time not to display taxes because it adds a lot of complexity and differs from account to account.

## About

### Security Concerns?

We connect with DigitalOcean using their official OAuth integration path. Here we request only *read* access and have no ability to make any changes to your account, ever. We can only read your invoices and active resources.

### Who built it?

Bill.DO was originally created by [SnapShooter](https://snapshooter.com?ref=chieftools) but is currently part of [Chief Tools](https://chief.app).

### Do you have a DigitalOcean referral link?

How nice if you to ask, yes we do! [Sign up for DigitalOcean using our referral link](https://m.do.co/c/d8be96706375) and get $200 in credit over 60 days. As a thank you DigitalOcean gives us once you’ve spent $25, also $25 in credits we can use for testing.
