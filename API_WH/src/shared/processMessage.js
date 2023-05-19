const whatsappServices = require("../services/whatsappServices");
const whatsappMessage = require("./whatsappMessage");

/**
 * @author STEVE
 * @function process
 * @description Procesa el mensaje recibido y envía una respuesta al número de teléfono proporcionado.
 * @param {string} message - Mensaje recibido del usuario.
 * @param {string} number - Número de teléfono del usuario.
 * @returns {Object} - Objeto con el mensaje y la etiqueta.
 * @throws {Error} - Si ocurre un error inesperado.
 */
async function process(msg, number) {
  try {
    let message =""
    message=await whatsappServices.api.sendRequestConsult(msg)
    const listEtiq = message.split(" / ")
    const language=listEtiq[0]
    const subEtia01=listEtiq[1]

    if (subEtia01 === 'greeting') {

      const subEtia02=listEtiq[2]

      if(subEtia02 === 'welcome'){
        //model = whatsappMessage.whatsAppMessageBuilder.typeText(number, '*Hola usuario*,\n\nEspero que estés teniendo un día *fantástico*. ¿En qué puedo ayudarte hoy?\n\n_Atentamente_,\nTu amigo ')
        message = "Bienvenida"
      }
      else{
        //model = whatsappMessage.MessageType.typeText(number, 'Hasta luego')
        message = "Hasta luego"
      }
    }
    if (subEtia01 === 'menu') {

      const subEtia02=listEtiq[2]

      if(subEtia02 === 'bigletter'){
        //model = whatsappMessage.whatsAppMessageBuilder.typeDocument(number,'https://www.laglorietarestaurant.com/uploads/carta/cartagrande.pdf','Menu del Dia')
        //model = whatsappMessage.whatsAppMessageBuilder.typeDocument(number,'https://www.laglorietarestaurant.com/uploads/carta/cartachica.pdf','Menu del Completo')
        message = "Mostrar Menus"
      }
      else{
        //model = whatsappMessage.MessageType.typeText(number, 'No entiendo')
        message = "No entendi"
      }
    }

    else if (subEtia01 === 'order') {
      const subEtia02=listEtiq[2]
      if(subEtia02 === 'requests'){

        const subEtia03=listEtiq[3]

        if(subEtia03 === 'consult'){
          // model = whatsappMessage.whatsAppMessageBuilder.typeText(number, 'Su pedido sera atendido en unos minutos')
          message = "Que decea pedir"
        }
        else{
          //model = whatsappMessage.MessageType.typeText(number, 'No entiendo')
          message = "No entiendo"
        }
      }
      else if(subEtia02 === 'payments'){
        const subEtia03=listEtiq[3]

        if(subEtia03 === 'typemethod'){
          // model = whatsappMessage.whatsAppMessageBuilder.typeText(number, 'En seguida le mostraremos los metodos de pago disponible')
          message = "Los metodos de pagos se listaran"
        }
        else if(subEtia03 === 'confirmationtypemethod'){

          const subEtia04=listEtiq[4]

          message = "Enseguida confirmaremos si se puede pagar con "
          if(subEtia04 === 'order.creditcard'){
            // model = whatsappMessage.whatsAppMessageBuilder.typeText(number, 'En seguida le mostraremos los metodos de pago disponible')
            message = message +"tarjeta de credito"
          }
          else if(subEtia04 === 'order.cash'){
            //model = whatsappMessage.MessageType.typeText(number, 'No entiendo')
            message = message +"dinero en efectivo"
          }
          else if(subEtia04 === 'order.plin'){
            //model = whatsappMessage.MessageType.typeText(number, 'No entiendo')
            message = message +"plin"
          }
          else if(subEtia04 === 'order.bank'){
            //model = whatsappMessage.MessageType.typeText(number, 'No entiendo')
            message = message +"pagofacil"
          }
          else if(subEtia04 === 'order.pagofacil'){
            //model = whatsappMessage.MessageType.typeText(number, 'No entiendo')
            message = message +"pagofacil"
          }
          else if(subEtia04 === 'order.pagoefectivo'){
            //model = whatsappMessage.MessageType.typeText(number, 'No entiendo')
            message = message +"pagoefectivo"
          }
        }

      }
      else if(subEtia02 === 'confirmations'){

        const subEtia03=listEtiq[3]

        if(subEtia03 === 'confirmation'){
          // model = whatsappMessage.whatsAppMessageBuilder.typeText(number, 'Pedido confirmado , gracias por su confianza')
          message = "El pedido fue confirmado"
        }
        else if(subEtia03 === 'paymethod'){
          // model = whatsappMessage.whatsAppMessageBuilder.typeText(number, 'Pedido confirmado , gracias por su confianza')
          message = "El pedido fue confirmado y se mostrar los metodos de pago"
        }
      }
      else if(subEtia02 === 'cancelations'){

        const subEtia03=listEtiq[3]

        if(subEtia03 === 'cancelation'){
          // model = whatsappMessage.whatsAppMessageBuilder.typeText(number, 'Pedido cancelado')
          message = "El pedido fue cancelado"
        }
        else if(subEtia03 === 'cancelationother'){
          // model = whatsappMessage.whatsAppMessageBuilder.typeText(number, 'Pedido confirmado , gracias por su confianza')
          message = "El pedido fue cancelado"
        }
      }
    }

    //whatsappServices.sendMessageText(model)
    return message

  } catch (error) {
    /*
    let model = whatsappMessage.MessageType.typeText(number, 'Upps, ocurrió un error inesperado')
    whatsappServices.sendMessageText(model)
    */
    return "Error"
  }
}

module.exports = {process}
