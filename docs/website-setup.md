# Setting up a domain name with DO

First of all, purchase your domain name from whatever site is the cheapest and doesn't look too dodgy. I used https://www.crazydomains.co.nz. Great name.

DO has these things called floating IPs (AWS calls them elastic IPs). They allow you to assign a "static IP" to your virtual server. Get one and assign it to your droplet which will run the load balancer.

Change the DNS records on your domain website (you can also manage DNS on DO by changing the NS records).
Simplest use case - give any domains you want hitting your server (eg. cruxfibre.nz and cruxfibre.co.nz) an A record with the value of your floating IP (eg. 167.99.28.86). You can also set up CNAME records for the www subdomain. The A record tells DNS how to resolve your domain names (ie. what IP address it should use).

Next, you need SSL like Mick Jenkins needs water. [Let's encrypt](https://letsencrypt.org/getting-started/) provides free SSL certificates, so I recommend you get yo broke ass over there.

Use [Certbot](https://certbot.eff.org/) to get your certificate. Follow the instructions for your OS and software. I am using HAProxy on Ubuntu (if you don't know what you're doing, stick with this setup as it's fairly easy).

Here's the DO tutorial which could be better than this one - https://www.digitalocean.com/community/tutorials/how-to-secure-haproxy-with-let-s-encrypt-on-ubuntu-14-04.

# Commands and what they do

SSH into your Ubuntu machine. Get the ip address from DO, or you can use the domain name.

`ssh -i ~/.ssh/crux root@167.99.28.86`

`ssh -i ~/.ssh/crux root@cruxfibre.nz` also works provided DNS records have been set up correctly (replace with your domain name).

## Get SSL certificates

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

I can run `dig cruxfibre.nz` to check. Replace with your domain name and make sure the IP address matches up to your server IP. Remember that it can take some time, the TTL could be 300s or something. Also just make sure you haven't missed something silly and the challenge should work.

I get a cert for the following domains (one cert works for all) - cruxfibre.nz www.cruxfibre.nz cruxfibre.co.nz www.cruxfibre.co.nz

## Set up HAPRoxy with the certs

Install HAProxy on the machine (remember, it's the one you sshed into).

`sudo apt-get install haproxy`

Now that the certs have been obtained, copy them into the relevant HAProxy folder with the following commands (also joins the certs together into the format that HAProxy likes).

```
sudo mkdir -p /etc/haproxy/certs
DOMAIN='cruxfibre.nz' sudo -E bash -c 'cat /etc/letsencrypt/live/$DOMAIN/fullchain.pem /etc/letsencrypt/live/$DOMAIN/privkey.pem > /etc/haproxy/certs/$DOMAIN.pem'
sudo chmod -R go-rwx /etc/haproxy/certs
```

Set up config file for HAProxy.

`sudo nano /etc/haproxy/haproxy.cfg` and copy in config file (for an example, see `/lb/staging/haproxy.cfg`).

`sudo service haproxy start` (or `sudo service haproxy reload` if already running).

## Set up Nginx for static file serving

Install Nginx on the same machine.

`sudo apt-get install nginx`

Set up config file for Nginx.

`sudo nano /etc/nginx/sites-available/default` and copy in config file (for an example, see `/web/staging/nginx.cfg`).

`sudo service nginx start` (or `sudo service nginx reload` if already running).

