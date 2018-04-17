# Setting up SSH keys

SSH keys are required for secure shell access to servers.

This could be useful for sites such as Github or Digital Ocean, which require server shell access to make stuff happen.

## Commands and what they do

`ssh-keygen -t rsa -b 4096` - generates 4096-bit RSA key pair. Nerd speak for the SSH key.

Now enter the directory path you want, including the key name. I'm going to use "crux".

`/Users/dankermode/.ssh/crux`

Next, enter a passphrase for the key if you are paranoid.

