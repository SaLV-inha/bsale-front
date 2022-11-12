# bsale-front

##  [Aplicacion](https://bsale-front-sandy.vercel.app/ "VanillaJS")


### Tech Stack


##  [VanillaJS](http://vanilla-js.com "VanillaJS")

##  [UmbrellaJS](https://umbrellajs.com "VanillaJS")

##  [Bootstrap](https://getbootstrap.com "VanillaJS")



### **Vistas**

## **Principal**

En la pantalla principal se encuentra un navbar con las opciones de:

        -Home 
        -Carrito 
        -Categorias 
        -Search
        
Debajo de esto se muestra un button-group con los filtros de productos este button-group desaparece al ingresar a alguna categoria de productos


luego todos los productos que consumimos de nuestra API.

![image](https://user-images.githubusercontent.com/100444023/201330794-c81b74cc-4f2e-450a-934b-70b087150cf6.png)

Damos click en las opciones que nos brinda el navbar:

**HOME** : Nos redirecciona a la pantalla principal

**CARRITO** : Si el usiario no ha seleccionado algún producto, se desplegará un modal igual a este. 

![image](https://user-images.githubusercontent.com/100444023/201330929-c963972b-40ae-4cbf-97c4-e7874fa1200c.png)

Si el usuario selecciona un producto estos se presentan en el modal con la siguiente descripción:

        -1: Número de orden del item.
        -2: Nombre del producto.
        -3: Cantidad; el cual aumenta o disminuye, pero si llega a "0" se elimina del carrito.
        -4: Precio; Este precio es dinámico y cambia dependiendo de la cantidad de un mismo producto.
 
![image](https://user-images.githubusercontent.com/100444023/201336576-2cd8601c-b098-4e1e-9a38-abf263c03a90.png)


En las siguientes 4 imagenes podemos ver como la web interactua con el usuario.


Muestra en el botón de añadir al carrito un texto que le indica al usuario la funcion que hace

![image](https://user-images.githubusercontent.com/100444023/201337760-00664f52-ecb4-4a75-bb65-75f1730a8894.png)


Al presionar un botón de carrito la web nos mostrará un mensaje en el cual nos dice que artículo acabo de agregar al carrito

![image](https://user-images.githubusercontent.com/100444023/201331144-8158a3da-eb41-414d-9001-9b61109af3e4.png)


Luego de presionar el botón ,este cambiar de color y el mensaje que sale ha continuacion es eliminar del carrito

![image](https://user-images.githubusercontent.com/100444023/201337705-45d44d17-f0a5-4961-abee-7477936dedf3.png)


Al presionar de nuevo el botón de carrito este cambiara a su color original y nos mostrará el mensaje de que producto acabo de eliminar del carrito 

![image](https://user-images.githubusercontent.com/100444023/201337930-4dd5b15b-2fdb-4723-95e8-106fce10bbdb.png)


Ya con productos en el carritoal darle click al botón CARRITO del navbar. este nos abre un modal con el articulo agregado

![image](https://user-images.githubusercontent.com/100444023/201331267-e2d630f5-7040-4c4f-86d2-f5139ec2c987.png)



En este modal se puede aumentar o disminuir la cantidad de productos ha comprar y el precio cambiará dependiendo del numero de elementos
si la cantidad de productos es 1 y se le da click a la flecha para abajo este producto desaparece del carrito.


![image](https://user-images.githubusercontent.com/100444023/201331320-6ffe57b1-bc9f-41d5-b1c4-2d0af57c0ebf.png)


Al darle click en el botón CATEGORÍA del navbar este mismo nos mostrara las categorias existentes.

![image](https://user-images.githubusercontent.com/100444023/201331489-5bd86531-f66f-486c-9aff-dd797e3a1043.png)


Al darle click a una CATEGORÍA esta se queda marcada y la web nos muestra todos los productos de la categoría seleccionada

![image](https://user-images.githubusercontent.com/100444023/201331598-e50bfccb-504d-4617-a91e-9431e0bbbcdd.png)


Al darle click al botón ORDENAR este nos mostrará varias formas de ordenar los productos 

![image](https://user-images.githubusercontent.com/100444023/201331664-77d8e561-538c-4a46-a027-d9428f66b84f.png)


Si damos click en una de estas formas de ordenar nos traera todos los que cumplan con lo seleccionado

![image](https://user-images.githubusercontent.com/100444023/201331704-24203a3b-da64-4f0a-9bd5-1f8bbf1afbf7.png)


En el espacio para busqueda si coloco un string con un tamaño menor a 3 este noa devolverá este mensaje

![image](https://user-images.githubusercontent.com/100444023/201341897-87a41d7c-e35d-4e3d-a135-487743bc3994.png)


En caso de ingresar un String que cumpla con los requisitos minimos la web mostrará todos los productos que contengan el estring agregado

![image](https://user-images.githubusercontent.com/100444023/201341971-0bd1a998-3676-4cd4-ad38-45459b616f05.png)


Este es un recorrido rápido por las funciones que tiene la web.

Les invito a que la usen y vean todas las funcionalidades que la web tiene.

Funciones que me gustaria agregar:

**Compra**

Que el modal contenga un botón de comprar y que al presionarlo me muestre:

    -El nombre de cada producto precedido de tu precio original

    -Calcule y me muestre el total de la suma del precio original como Subtotal

    -La suma de descuentos como Descuentos 

    -La resta del total precio original menos el total de descuentos como TOTAL
    
    
## **Desarrollador : Luis Salvador**
