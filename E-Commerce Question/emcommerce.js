
window.addEventListener("DOMContentLoaded",()=>{

    try{
        axios.get('https://crudcrud.com/api/1f82ab85817c42b58dfe1b25cd97cae5')
        .then((res)=>{
            for(let i=0; i<res.data.length; i++){
                showOrderOnScreen(res.data[i])
            }
        })
    }
    catch(err){
        console.log(err)
    }
    
})

async function submitOrder(e){
    
    
    try{
        const price = document.getElementById('price').value
        const product = document.getElementById('product').value
        const category = document.getElementById('category').value

        if (price == "" || product=="" || category=="") {
            alert("Enter valid details");
            return false;
        };

        console.log(price, product, category)

        let obj={
            price:price,
            product:product,
            category:category
        };

        console.log(obj)

        await axios.post('https://crudcrud.com/api/1f82ab85817c42b58dfe1b25cd97cae5/Orders', obj)
            .then((res)=>{
                showOrderOnScreen(res.data)
                document.getElementById('price').value = ''
                document.getElementById('product').value = ''
                document.getElementById('category').value = '1'
            })
    }

    catch(err){
        console.log(err)
    }
}

async function showOrderOnScreen(order){
    
    try{
        let orderELement = `<li id='${order._id}'>${order.price}-${order.product}
        <button onclick=deleteOrder('${order._id}') class="delete-buttons">Delete Order</button>
        </li>`
        let parDiv = document.getElementById(`type-${order.category}-list`)
        console.log('product number in obj is '+ order.category)
        console.log('parDiv=', parDiv)
        parDiv.innerHTML = parDiv.innerHTML + orderELement
    }
    catch(err){
        console.log(err)
    }
}

async function deleteOrder(_id){
    try{
        await axios.delete(`https://crudcrud.com/api/1f82ab85817c42b58dfe1b25cd97cae5/Orders/${_id}`)
        .then(()=>{
            let orderToDelete = document.getElementById(`${_id}`)
            let par = orderToDelete.parentElement
            par.removeChild(orderToDelete)
        })
    }


        catch(err){
            console.log(err)
        }
}