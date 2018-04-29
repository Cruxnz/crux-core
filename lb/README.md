## Load balancer

http://www.haproxy.org/

This folder contains the config file Crux uses for HAProxy.

Located at `/etc/haproxy/haproxy.cfg`.

`tail /var/log/syslog`

`scp -i ~/.ssh/crux staging/haproxy.cfg root@staging.cruxfibre.nz:/etc/haproxy/haproxy.cfg`
