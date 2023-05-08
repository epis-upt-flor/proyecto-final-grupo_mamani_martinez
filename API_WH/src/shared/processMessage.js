const whatsappServices = require("../services/whatsappServices");
const whatsappMessage = require("./whatsappMessage");

async function process(message, number) {
  try {
    let result = await nlpManager.testNluManagerEs("es", message,{ includeDomains: true })
    let message =""
    let label= ""
    let model;

    if (result.domain === 'saludo') {
      model = whatsappMessage.whatsAppMessageBuilder.typeText(number, '*Hola usuario*,\n\nEspero que estés teniendo un día *fantástico*. ¿En qué puedo ayudarte hoy?\n\n_Atentamente_,\nTu amigo ')
    }
    else if (result.domain === 'order.request') {
      model = whatsappMessage.whatsAppMessageBuilder.typeText(number, 'Su pedido sera atendido en unos minutos')
    }
    else if ((result.intent.split(".")[0] +"."+ result.intent.split(".")[1]) === 'order.menu') {
      if (result.intent == "order.menu.obtenerMenuDia") {
        model = whatsappMessage.whatsAppMessageBuilder.typeDocument(number,'https://www.laglorietarestaurant.com/uploads/carta/cartagrande.pdf','Menu del Dia')
      }
      else if (result.intent == "order.menu.obtenerMenu") {
        model = whatsappMessage.whatsAppMessageBuilder.typeDocument(number,'https://www.laglorietarestaurant.com/uploads/carta/cartachica.pdf','Menu del Completo')
      }
      else {
        messageReturn = 'No se ha especificado una opción válida'
      }

    }
    else if ((result.intent.split(".")[0] +"."+ result.intent.split(".")[1]) === 'order.confirmation') {
      if (result.intent === "order.confirmation.confirmacionPedido") {
        model = whatsappMessage.whatsAppMessageBuilder.typeText(number, 'Su pedido se confirmo')
      } else if (result.intent === "order.confirmation.confirmacionPedidoMetodoPago") {
        model = whatsappMessage.whatsAppMessageBuilder.typeText(number, 'Su pedido se confirmo y los metodos pagos son:')
      } else {
        model = whatsappMessage.whatsAppMessageBuilder.typeText(number, 'No entiendo su confirmacion')
      }
    }

    else if ((result.intent.split(".")[0] +"."+ result.intent.split(".")[1]) === 'order.cancelation') {
      if (result.intent === "order.confirmation.cancelacionPedido") {
        model = whatsappMessage.whatsAppMessageBuilder.typeText(number, 'Cancelacion de pedido en proceso')

      } else if (result.intent === "order.confirmation.cancelacionPedidoReembolso") {
        model = whatsappMessage.whatsAppMessageBuilder.typeText(number, 'Cancelacion de pedido en proceso y reembolso')

      } else {
        model = whatsappMessage.whatsAppMessageBuilder.typeText(number, 'No se ha especificado una opción válida de cancelación del pedido')

      }
    }
    else if ((result.intent.split(".")[0] +"."+ result.intent.split(".")[1]) === 'order.payment') {
      if(result.intent ==="order.payment.preguntaMetodoPago"){
        model = whatsappMessage.whatsAppMessageBuilder.typeText(number, 'Los metodos de pagos disponibles son : yape , etc')
      }
      else if(result.intent ==="order.payment.confirmacionMetodoPago"){
        model = whatsappMessage.whatsAppMessageBuilder.typeText(number, 'Verificar si el metodo de pago esta disponible')
      }
      else if(result.intent ==="order.payment.confirmacionPedido"){
        model = whatsappMessage.whatsAppMessageBuilder.typeText(number, 'Verificar si el metodo de pago esta disponible y se confirmara el pedido')
      }
    }
    else if (result.domain === 'despedida') {
      model = whatsappMessage.MessageType.typeText(number, 'Hasta luego')
    }

    whatsappServices.SendMessageText(model)

    return message,label;
  } catch (error) {
    let model = whatsappMessage.MessageType.typeText(number, 'Upps, ocurrió un error inesperado')
    whatsappServices.SendMessageText(model)
  }
}

module.exports = {process}
