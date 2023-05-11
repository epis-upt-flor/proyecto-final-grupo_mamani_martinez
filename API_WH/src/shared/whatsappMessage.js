/**
 * @author STEVE
 * @function whatsAppMessageBuilder
 * @description Clase que construye mensajes para ser enviados a través de WhatsApp
 */
class whatsAppMessageBuilder {
    /**
     * @function typeText
     * @description Crea un mensaje de texto para ser enviado a un número de WhatsApp
     * @param {String} number - Número de WhatsApp al que se enviará el mensaje
     * @param {String} resText - Texto que se enviará en el mensaje
     * @returns {String} Cadena en formato JSON que representa el mensaje de texto
     */
    static typeText(number, resText) {
        const data = JSON.stringify({
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: number,
            type: "text",
            text: {
                preview_url: false,
                body: resText
            }
        });
        return data;
    }

    /**
     * @function typeImage
     * @description Crea un mensaje de imagen para ser enviado a un número de WhatsApp
     * @param {String} number - Número de WhatsApp al que se enviará el mensaje
     * @param {String} urlImage - URL de la imagen que se enviará en el mensaje
     * @returns {String} Cadena en formato JSON que representa el mensaje de imagen
     */
    static typeImage(number, urlImage) {
        const data = JSON.stringify({
            messaging_product: "whatsapp",
            to: number,
            type: "image",
            image: {
                link: urlImage
            }
        });
        return data;
    }

    /**
     * @function typeButton
     * @description Crea un mensaje de botón interactivo para ser enviado a un número de WhatsApp
     * @param {String} number - Número de WhatsApp al que se enviará el mensaje
     * @returns {String} Cadena en formato JSON que representa el mensaje de botón interactivo
     */
    static typeButton(number) {
        const data = JSON.stringify({
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: number,
            type: "interactive",
            interactive: {
                type: "button",
                body: {
                    text: "*Confirmas tu Pedido*"
                },
                action: {
                    buttons: [
                        {
                            type: "reply",
                            reply: {
                                id: "001",
                                title: "Si"
                            }
                        },
                        {
                            type: "reply",
                            reply: {
                                id: "002",
                                title: "No"
                            }
                        }
                    ]
                }
            }
        });
        return data;
    }


    /**
     * @function typeLocation
     * @description Crea un mensaje de tipo ubicación para enviar a través de WhatsApp.
     * @param {string} number - El número de destinatario.
     * @param {number} lat - Latitud de la ubicación.
     * @param {number} lon - Longitud de la ubicación.
     * @param {string} name - Nombre de la ubicación.
     * @returns {string} - El mensaje en formato JSON.
     */
    static typeLocation(number, lat, lon, name) {
        const data = JSON.stringify({
            "messaging_product": "whatsapp",
            "to": number,
            "type":"location",
            "location": {
                "latitude": lat,
                "longitude": lon,
                "name": name,
                "address": "Test"
            }
        });
        return data;
    }

    /**
     * @function typeUrl
     * @description Crea un mensaje de tipo texto con una URL para enviar a través de WhatsApp.
     * @param {string} number - El número de destinatario.
     * @param {string} text - El texto del mensaje.
     * @param {string} url - La URL a incluir en el mensaje.
     * @returns {string} - El mensaje en formato JSON.
     */
    static typeUrl(number, text, url) {
        const data = JSON.stringify({
            "messaging_product": "whatsapp",
            "to": number,
            "text": {
                "preview_url": true,
                "body": text + " : " + url
            }
        });
        return data;
    }

    /**
     * @function typeDocument
     * @description Crea un mensaje de tipo documento para enviar a través de WhatsApp.
     * @param {string} number - El número de destinatario.
     * @param {string} url - La URL del documento.
     * @param {string} text - El texto que describirá el documento.
     * @returns {string} - El mensaje en formato JSON.
     */
    static typeDocument(number, url, text) {
        const data = JSON.stringify({
            "messaging_product": "whatsapp",
            "to": number,
            "type":"document",
            "document": {
                "link": url,
                "caption":text
            }
        });
        return data;
    }
}

module.exports = {whatsAppMessageBuilder}