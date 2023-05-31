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

let dataOrders = [{name:"salchipapa",quantity:5,price:8},{name:"lomo saltado",quantity:1,price:12.5}]

async function process(msg, number) {
  try {


    let resultado = await whatsappServices.api.sendRequestConsult(msg)
    let message ="Null"
    const listEtiq = resultado.split(" / ")
    const language=listEtiq[0]
    const subEtia01=listEtiq[1]

    const order = new whatsappServices.order.orderService
    const customer=await signCustomer(number)
    const orderDt=await order.getOrdersByCustomerId(customer["customer_id"])

    if(customer["status"] === "A" && orderDt=== null){
      let conversation = new whatsappServices.conversation.conversationService


      await conversation.createConversation({
        customer_id: customer["customer_id"],
        messages: msg,
        label : resultado
      })


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
      else if (subEtia01 === 'menu') {

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
            message = "Que desea ordenar , indique la cantidad y el plato porfavor"
            order.createOrder({conversation_id:conversation["conversation_id"],customer_id:customer["customer_id"],total_amount:0})
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
      }
    }

    else if(orderDt){
      const subEtia02=listEtiq[2]
      if(subEtia02 === 'confirmations'){

        const subEtia03=listEtiq[3]

        if(subEtia03 === 'confirmation'){
          // model = whatsappMessage.whatsAppMessageBuilder.typeText(number, 'Pedido confirmado , gracias por su confianza')

          try{
            let ordersResult = await order.updateOrderStatusById(orderDt["order_id"],"A")
            if(ordersResult !== undefined){
              message = "Pedido confirmado"
            }
            else{
              messa = "Hubo un error al confirmar el pedido"
            }
          } catch (error) {
            message = "Error al agregar la orden: " + error
          }
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
          try{
            let ordersResult = await order.updateOrderStatusById(orderDt["order_id"],"R")
            if(ordersResult !== undefined){
              message = "Pedido cancelado"
            }
            else{
              messa = "Hubo un error al cancelar el pedido"
            }
          } catch (error) {
            message = "Error al agregar la orden: " + error
          }
        }
        else if(subEtia03 === 'cancelationother'){
          // model = whatsappMessage.whatsAppMessageBuilder.typeText(number, 'Pedido confirmado , gracias por su confianza')
          message = "El pedido fue cancelado"
        }
      }
      else{
        let ordersJson = await whatsappServices.api.sendRequestDish(msg)
        let ordersResult = await order.getListProducts(orderDt["order_id"])

        for (let item of ordersJson) {
          try {
            const productExistsDt = dataOrders.find((product) => product.name === item.NAME);

            if (item.QUANTITY > productExistsDt["quantity"]) {
              message = "Ingrese una cantidad menor a "+productExistsDt["quantity"]
            }else if(productExistsDt["quantity"] > 0){
              //Simulacion de BD
              let existingProduct = ordersResult.find((product) => product.name === item.NAME)
              const priceProduct = productExistsDt["price"]

              if(existingProduct){

                const updatedQuantity = (existingProduct["quantity"] + item.QUANTITY) > productExistsDt["quantity"]? productExistsDt["quantity"]: (existingProduct["quantity"] + item.QUANTITY);
                existingProduct["quantity"] = updatedQuantity
                let result = await order.updateListProducts(orderDt["order_id"],existingProduct)
                if (result == null) {
                  message = "Hubo un error al agregar el producto"
                } else {
                  message = "Producto actualizado correctamente"
                }

              }
              else {
                const updatedQuantity = item.QUANTITY > productExistsDt["quantity"]? productExistsDt["quantity"] : item.QUANTITY

                let result = await order.addListProducts(orderDt["order_id"],item.NAME, updatedQuantity, priceProduct)
                if (result == null) {
                  message = "Hubo un error al agregar el producto"
                } else {
                  message = "Producto añadido con éxito."
                }
              }
              message += message + "¿Le gustaría incorporar al pedido algo mas o prefiere confirmar la adquisición de este pedido o cancelar la adquisición de este pedido?"
            }
            else {
              message = "Lamentamos pero ya no se encuentra disponible , desea pedir algo mas"
            }
          } catch (error) {
            message = "Error al agregar la orden"+error
          }
        }
      }

      return message
    }

    else if(customer["status"] === "B"){
      message = "Usted esta bloqueado"
      return message
    }

    else if(customer["status"] === "I"){
      return "Inactivo"
    }

    //whatsappServices.sendMessageText(model)
    return message

  } catch (error) {
    /*
    let model = whatsappMessage.MessageType.typeText(number, 'Upps, ocurrió un error inesperado')
    whatsappServices.sendMessageText(model)
    */
    console.log("Error (ProccesMessage): "+error)
  }
}

async function signCustomer(number){
  let customer = null

  let model = new whatsappServices.customer.customerService

  try{
    customer = await model.getCustomerByNumber(number)
    if(customer === null){
      customer = await model.createCustomer({phone_number:number})
    }
    console.log("Exist User")
    return customer
  }catch (error) {
    console.log("Error create User")
    throw error
  }
}



module.exports = {process}
