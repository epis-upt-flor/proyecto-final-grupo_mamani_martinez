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
    let message =""
    const listEtiq = resultado.split(" / ")
    const language=listEtiq[0]
    const subEtia01=listEtiq[1]

    const order = new whatsappServices.order.orderService
    const conversation = new whatsappServices.conversation.conversationService
    const payment = new whatsappServices.payment.paymentService
    const customer = new whatsappServices.customer.customerService

    const customerSign=await signCustomer(customer,number)
    const orderCustomer=await order.getOrdersByCustomerId(customerSign["customer_id"])

    if (customerSign["status"] === "A") {
      if (orderCustomer === null) {

        if (subEtia01 === 'greeting') {
          await addConversation(conversation,msg,resultado,customerSign["customer_id"])
          const subEtia02=listEtiq[2]
          if(subEtia02 === 'welcome'){
            //model = whatsappMessage.whatsAppMessageBuilder.typeText(number, 'Espero que estés teniendo un día *fantástico*. ¿En qué puedo ayudarte hoy?\n\n_Atentamente_,\nTu amigo ')
            message = "Espero que estés teniendo un gran dia. ¿En qué puedo ayudarte hoy?"
          }
          else{
            //model = whatsappMessage.MessageType.typeText(number, 'Hasta luego')
            message = "¡Hasta luego! No tengas un buen dia , ten un gran dia"
          }
        }
        else if (subEtia01 === 'menu') {
          await addConversation(conversation,msg,resultado,customerSign["customer_id"])
          const subEtia02=listEtiq[2]

          if(subEtia02 === 'bigletter'){
            //model = whatsappMessage.whatsAppMessageBuilder.typeDocument(number,'https://www.laglorietarestaurant.com/uploads/carta/cartagrande.pdf','Menu del Dia')
            //model = whatsappMessage.whatsAppMessageBuilder.typeDocument(number,'https://www.laglorietarestaurant.com/uploads/carta/cartachica.pdf','Menu del Completo')
            message = "A continuación, se muestran los platos disponibles:"
            for (let i in dataOrders) {
              message += "\nNombre: " + dataOrders[i].name + " Cantidad: " + dataOrders[i].quantity + " Precio: " + dataOrders[i].price;
            }

          }
          else{
            //model = whatsappMessage.MessageType.typeText(number, 'No entiendo')
            message = "No entiendo la operacion"
          }
        }
        else if (subEtia01 === 'order') {
          const conversationAdd=await addConversation(conversation,msg,resultado,customerSign["customer_id"])
          const subEtia02=listEtiq[2]
          if(subEtia02 === 'requests'){
            const subEtia03=listEtiq[3]
            if(subEtia03 === 'consult'){
              // model = whatsappMessage.whatsAppMessageBuilder.typeText(number, 'Su pedido sera atendido en unos minutos')
              message = "Por favor, indique qué desea ordenar, especificando la cantidad y el nombre del plato, por favor."
              order.createOrder({conversation_id:conversationAdd["conversation_id"],customer_id:customerSign["customer_id"],total_amount:0})
            }
          }
          else{
            //model = whatsappMessage.MessageType.typeText(number, 'No entiendo')
            message = "Disculpa, pero no entiendo la operación que estás describiendo, ya que no mencionaste el inicio de una orden. ¿Podrías proporcionar más detalles o aclarar lo que deseas realizar? Estoy aquí para ayudarte."
          }
        }
        else{
          //model = whatsappMessage.MessageType.typeText(number, 'No entiendo')
          message = "Disculpa operacion desconocida"
        }
      } else {
          const subEtia02=listEtiq[2]
          if (orderCustomer.product_status === "A" && orderCustomer.payment_status === "A" && orderCustomer.delivery_status === "A"){
            const ordersResult = await order.updateOrderStatusById(orderCustomer["order_id"], "A");
            if(ordersResult!==undefined){
              message = "¡Excelentes noticias! Su pedido ya está en camino hacia usted."
            }
            else{
              message = "Lamentamos informarle que su pedido no pudo ser procesado y ha sido rechazado."
            }
          }
          else if (orderCustomer.product_status === "P") {
            let ordersJson = await whatsappServices.api.sendRequestDish(msg)

            if(ordersJson !== null) {
              let ordersJson = await whatsappServices.api.sendRequestDish(msg)
              let ordersResult = await order.getListProducts(orderCustomer["order_id"])

              for (let item of ordersJson) {
                try {
                  //Simulacion de BD
                  const productExistsDt = dataOrders.find((product) => product.name === item.NAME);

                  if (item.QUANTITY > productExistsDt["quantity"]) {
                    message = "Ingrese una cantidad menor a "+productExistsDt["quantity"]
                  }else if(productExistsDt["quantity"] > 0){

                    let existingProduct = ordersResult.find((product) => product.name === item.NAME)
                    const priceProduct = productExistsDt["price"]

                    if(existingProduct){

                      const updatedQuantity = (existingProduct["quantity"] + item.QUANTITY) > productExistsDt["quantity"]? productExistsDt["quantity"]: (existingProduct["quantity"] + item.QUANTITY);
                      existingProduct["quantity"] = updatedQuantity
                      let result = await order.updateListProducts(orderCustomer["order_id"],existingProduct)
                      if (result == null) {
                        message = "Hubo un error al agregar el producto : \n Orden : "+item.NAME+"\n Cantidad : "+updatedQuantity+"\n Precio : "+priceProduct
                      } else {
                        message = "Producto actualizado con correctamente : \n Orden : "+item.NAME+"\n Cantidad : "+updatedQuantity+"\n Precio : "+priceProduct
                      }
                    }
                    else {
                      const updatedQuantity = item.QUANTITY > productExistsDt["quantity"]? productExistsDt["quantity"] : item.QUANTITY
                      let result = await order.addListProducts(orderCustomer["order_id"],item.NAME, updatedQuantity, priceProduct)
                      if (result == null) {
                        message = "Hubo un error al agregar el producto : \n Orden : "+item.NAME+"\n Cantidad : "+updatedQuantity+"\n Precio : "+priceProduct
                      } else {
                        message = "Producto añadido con éxito : \n Orden : "+item.NAME+"\n Cantidad : "+updatedQuantity+"\n Precio : "+priceProduct
                      }
                    }
                    message = message + "\n¿Le gustaría incorporar al pedido algo mas o prefiere confirmar la adquisición de este  o cancelar la adquisición?"
                  }
                  else {
                    message = "Lamentamos pero ya no se encuentra disponible , desea pedir algo mas"
                  }
                } catch (error) {
                  message = "Tenemos poblemas al agregar el producto "+error
                }
              }
              await addConversation(conversation,msg,resultado,customerSign["customer_id"])
            } else {
                if(subEtia02 === 'confirmations') {
                  const subEtia03 = listEtiq[3];
                  try {
                      let ordersResult = await order.updateOrderProductStatusById(orderCustomer["order_id"], "A");
                      if (ordersResult !== undefined) {
                          if (subEtia03 === 'confirmation') {
                              message = "!Confirmacion de pedidos! Tu pedido ha sido confirmado \nPor favor, seleccione el método de pago o consulte los métodos de pago disponibles"
                          }else if (subEtia03 === 'paymethod') {
                              message ="¡Confirmación de Pedido! Su pedido ha sido confirmado. En breve, le presentaremos los métodos de pago disponibles.";
                              message =message + "\nLos metodos de pagos disponibles son : \n- Yape \n- Fisico";
                          }else {
                              message = "Operación desconocida";
                          }
                      } else {
                          message = "Hubo un error al confirmar el pedido";
                      }
                  } catch (error) {
                      message = "Error al confirmar a la orden";
                  }
                  await addConversation(conversation,msg,resultado,customerSign["customer_id"])
                } else if(subEtia02 === 'cancelations') {
                  // model = whatsappMessage.whatsAppMessageBuilder.typeText(number, 'Pedido cancelado')
                  const subEtia03 = listEtiq[3];
                  try {
                      let ordersResult = await order.updateOrderStatusById(orderCustomer["order_id"], "R");
                      if (ordersResult !== undefined) {
                          if (subEtia03 === 'cancelation') {
                              message = "!Cancelacion de pedidos! Tu pedido ha sido cancelado";
                          } else if (subEtia03 === 'cancelationother') {
                              message = "¡Cancelación de pedidos! Tu pedido ha sido cancelado. Por favor, mantente atento/a, en breve recibirás una respuesta por parte de nuestro personal de ayuda.";
                          } else {
                              message = "Operación desconocida";
                          }
                      } else {
                          message = "Hubo un error al cancelar el pedido";
                      }
                  } catch (error) {
                      message = "Error al cancelar a la orden";
                  }
                  await addConversation(conversation,msg,resultado,customerSign["customer_id"])
                }
                else {
                  message = "Accion desconocida"
                }
            }
          } else if (orderCustomer.payment_status === "P") {
            if(subEtia02 === 'payments') {
              const subEtia03 = listEtiq[3];
              try {
                if (subEtia03 === 'confirmationtypemethod') {
                  const metodoPago = listEtiq[4].split(".")[1]
                  try {

                    const paymentResult = await payment.getPaymentsByName(metodoPago);
                    console.log(metodoPago)
                    console.log(paymentResult)
                    if (paymentResult === null) {
                        message = "Ingrese otro metodo de pago porfavor";
                        message +="\nMetodos de pago disponible: "
                        const paymentResults = await payment.getAllPayments()

                        let countI = 0
                        paymentResults.forEach(payment => {
                          countI += 1
                          message +="\n"+countI+".-"+payment.payment_method
                        });
                    }
                    else{
                      const orderUpdatePayment = await order.updateOrderPaymentID(orderCustomer.order_id,paymentResult.payment_id);

                      if (!orderUpdatePayment) {
                          message = "No se pudo actualizar el estado de pago del pedido";
                          throw new Error(message);
                      }

                      message = "Método de pago acceptado";
                      message += "\n Por favor, introduzca su dirección:";
                    }
                } catch (error) {
                    message = `Tuvimos un problema al crear el método de pago`+error;
                }

                }else {
                    message = "Los metodos de pagos disponibles son : \n- Yape \n- Fisico";
                }
              } catch (error) {
                  message = "Error al confirmar el metodo de pago";
              }
              await addConversation(conversation,msg,resultado,customerSign["customer_id"])
            }else {
              message = "Accion desconocida"
            }
          } else if (orderCustomer.delivery_status === "P") {
              // aquí...
          }
          else{
            message = "Acción desconocida, continúa agregando más platos."
          }
      }
    } else if (customerSign["status"] === "I" || customerSign["status"] === "B") {
        message = "Espere un momento"
    } else {
        message = "Disculpa operacion desconocida"
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

async function signCustomer(model,number){
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

async function addConversation(model,message,label,customerID){
  try{
    return await model.createConversation({
      customer_id: customerID,
      messages: message,
      label : label
    })
  }catch (error) {
    console.log("Error add conversation")
    throw error
  }
}



module.exports = {process}