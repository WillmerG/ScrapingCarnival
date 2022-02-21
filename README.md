# Proyecto Scraping

En este ejemplo tomaremos los datos de una pagina web y los insertaremos en un archivo json, recuerde después de clonar el proyecto ejecutar: ***npm i***

La estructura del proyecto es la siguiente 

![carpetas](https://user-images.githubusercontent.com/22646625/154970753-d5b1bf39-9705-4acc-b8dd-dd3896891aee.png)


Al estar en la carpeta ScrapingCarnival podemos ejecutar el siguiente comando en la terminal
````
  npm run
````

De esta manera podemos ver todos los script disponibles en el proyecto para la ejecución del mismo 

![scrip](https://user-images.githubusercontent.com/22646625/154973108-439209e5-77ea-4be2-acef-c5162ccfbe3f.png)

Para ejecutar el scraping se debe ejecutar el siguiente comando 
````
npm run start
````
Una vez ejecutado el comando anterior realizara el scraping y se guardaran los datos en la ruta src/data/ListCarnival.json

Para probar nuevamente el proceso se debe ejecutar primero el scrip limpiar (que elimina todos los archivos json de la carpeta data) y después start
````
npm run limpiar
````

````
npm run start
````
