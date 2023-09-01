---
title:
    en: Serving webpage securely
    es: Sirviendo página web de forma segura

draft: true
---

We want sensitive data in our HTML that we need to serve securely.

Web security currently consists of

#### SSL

HTTP:// is a must have

#### Basic HTTP Authentication

Usually done with a `.htaccess` file.
Unsecure because `.htaccess` file is stored in plain text (base64).
Also the content you serve is stored in plain text.

#### OAuth / OpenID

Using a server that implements OAuth protocol like: Google, Okta, Auth0...

#### Secure the server

Keep it updated. Clean the dirt. Practice password hand-washing.
I just made up the last one, use a password manager.
And backup.

### Biometric auth

This is complex as ****, [WebAuthn API](https://webauthn.guide/) will help but it's not universally supported.

#### Web Crypto API

Cryptography right on browser's Javascript. Can encrypt-decrypt with a password.

What if... we encrypt the whole HTML page and serve it encrypted... and there we decrypt it with Web Crypto API?

Let's change the title of the post:

---

# Serving encrypted webpages

```html
<script>
    const encryptedData = '<encrypted html string of the whole real page>';
    const decryptedHtml = await decrypt(encryptedData);
    document.write(decryptedHtml);

    async function decrypt(data) {
        const passphrase = prompt("Enter decryption passphrase");
        const enc = new TextEncoder();

        const decKey = await window.crypto.subtle.importKey(
            'raw',
            enc.encode(passphrase),
            { name: 'AES-GCM', length: 256 },
            false,
            ['decrypt']
        );

        const decryptedData = await window.crypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: enc.encode('some_fixed_initialization_vector')
            },
            decKey,
            new Uint8Array(data.split(',').map(Number))
        );

        return new TextDecoder().decode(decryptedData);
    }
</script>
```
