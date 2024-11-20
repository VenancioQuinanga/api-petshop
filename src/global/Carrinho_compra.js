// class Shopping_cart {
//     item = new Array()

//     add_item(id, name, description, price, quantity ){
//         this.item.push({id, name, description, price, quantity })
//     }
    
//     show_item(){
//         this.item.map((item, index)=>{
//             console.log(`${index + 1}| ${item.name}  ${item.description}  ${item.price}Kz  ${item.quantity}  ${item.quantity * item.price}Kz`)
//         })
//     }

//     remove_item(id){
//         this.item.splice(id, 1)
//     }

//     clear_items(){
//         this.item.length = 0
//     }

//     to_finish_shopping(){
//         this.item.map((item)=>{
//             // console.log(`${item.id}  ${item.name}  ${item.description}  ${item.price}Kz  ${item.quantity}  ${item.quantity * item.price}Kz`)
//             ':id_product/:fk_payment_type/:payment/:troco/:date/:fk_user'
//         })
//     }

//     close_shopping(){
//         if(this.item.length === 0) console.log('Add product in shopping cart...')
//         else this.to_finish_shopping()
//     }
// }

// let client = new Shopping_cart()

// client.add_item(1, 'Sabão', 'Sabão anti-púlgas', 5000, 2)
// client.add_item(2, 'Ração', 'Ração ligth para cachorros', 15000, 2)
// client.add_item(3, 'Ração', 'Ração ligth para cachorros', 15000, 2)
// client.add_item(4, 'Ração', 'Ração ligth para cachorros', 15000, 2)
// client.remove_item(0)
// client.show_item()
// client.close_shopping()
