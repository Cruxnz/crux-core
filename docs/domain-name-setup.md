# Setting up a domain name with DO

First of all, purchase your domain name from whatever site is the cheapest and doesn't look too dodgy. I used https://www.crazydomains.co.nz. Great name.

DO has these things called floating IPs (AWS calls them elastic IPs). They allow you to assign a "static IP" to your virtual server. Get one and assign it.

Change the DNS records on your domain website (you can also manage DNS on DO but it should be easy enough if you have a decent service).
Simplest use case - give any domains you want hitting your server (eg. cruxfibre.nz and cruxfibre.co.nz) an A record with the value of your floating IP (eg. 167.99.28.86). The A record tells DNS how to resolve your domain names (ie. what IP address it should use).

Next, the tricky part. You need SSL like Mick Jenkins needs water. [Let's encrypt](https://letsencrypt.org/getting-started/) provides free SSL certificates, so I recommend you get yo broke ass over there.

Use [Certbot](https://certbot.eff.org/) to get your certificate. Follow the instructions for your OS and software. I am using HAProxy on Ubuntu (if you don't know what you're doing, stick with this setup as it's fairly easy).

Here's the DO tutorial which could be better than this one - https://www.digitalocean.com/community/tutorials/how-to-secure-haproxy-with-let-s-encrypt-on-ubuntu-14-04.

## Commands and what they do

SSH into your Ubuntu machine.

`ssh -i ~/.ssh/crux root@167.99.28.86`

Install HAProxy.

`sudo apt-get install haproxy`

Get certbot and your certificates.

```
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install certbot
```

`sudo certbot certonly`

Follow the steps, I recommend using the standalone server. Make sure your A records are set up correctly on your DNS service.

I can run `dig cruxfibre.nz` to check. Replace with your domain name and make sure the IP address matches up to your server IP. Remember that it can take some time, the TTL could be 300s or something. Also just make sure you're not an idiot and the challenge should work.

I get a cert for the following domains (one cert works for all) - cruxfibre.nz www.cruxfibre.nz cruxfibre.co.nz www.cruxfibre.co.nz

```
sudo mkdir -p /etc/haproxy/certs
DOMAIN='cruxfibre.nz' sudo -E bash -c 'cat /etc/letsencrypt/live/$DOMAIN/fullchain.pem /etc/letsencrypt/live/$DOMAIN/privkey.pem > /etc/haproxy/certs/$DOMAIN.pem'
sudo chmod -R go-rwx /etc/haproxy/certs
```

Set up config file for HAProxy

`sudo nano /etc/haproxy/haproxy.cfg`

`sudo service haproxy start`



