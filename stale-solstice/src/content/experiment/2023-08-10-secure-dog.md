---
title:
    en: Encrypted dog
    es: Perro encriptado

pinned: true
draft: true
---

Write "pupe" to see the dog.

<button onclick="showDog()">I want to see the dog!</button>
<button onclick="encryptTextarea()">I want to encrypt!</button>
<textarea>potato</textarea>

<script>
    async function encryptTextarea() {
        const content = document.querySelector("textarea").value;
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        const encryptedData = await encrypt(content, iv);

        const html =
`<script>
    decrypt("${encyptedData}", "${iv}").then(document.write);
    ${decrypt.toString()}
</scrip` + 't>'; // we can't need to break it or the script would end here

        const file = new Blob([html], { 'type': 'text/html' })
        const url = URL.createObjectURL(file);

        document.body.appendChild(element("a", {
            href: url,
            download: "encrypted.html"
        }));

        function element(tag, props) {
            const el = document.createElement(tag);
            Object.assign(el, props);
            return el;
        }
    }

    async function encrypt(plainText, iv) {
        const passphrase = prompt("Enter encryption passphrase");
        const enc = new TextEncoder();

        const encryptionKey = await window.crypto.subtle.importKey(
            'raw',
            enc.encode(passphrase),
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt']
        );

        const encryptedData = await window.crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            encryptionKey,
            enc.encode(plainText)
        );

        return encryptedData;
    }

    async function showDog() {
        const encryptedData = '<encrypted html string of the whole real page>';
        const decryptedHtml = decrypt(encryptedData, '<iv>');
        document.write(decryptedHtml);
    }

    async function decrypt(data, iv) {
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
            { name: 'AES-GCM', iv },
            decKey,
            new Uint8Array(data.split(',').map(Number))
        );

        return new TextDecoder().decode(decryptedData);
    }
</script>