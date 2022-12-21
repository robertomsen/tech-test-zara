### Prueba tecnica ZARA - Frontend)

Para el desarrollo de la prueba, se ha utilizado React 18.

Cambios a futuro (por falta de tiempo):

- Utilizar Redux o Context API para generar una store y guardar el listado de podcast y los episodios (actualmente utilizo localStorage por simplicidad)
- Sacar el fetch a un helper, para mejorar la legibilidad.
- Implementar un componente de la Card Info cuando entras a un podcast, de este modo, no se reutiliza código en la vista del episodio seleccionado.
- Se ha realizado la comprobación de una vez al día solo en la primera llamada, en las demás, no.

## Scripts disponibles

En la raiz del directorio, puedes realizar los siguientes comandos:

### `npm start`

Lanza la aplicación en modo development \
Abre [http://localhost:3000](http://localhost:3000) para verlo en el navegador.


### `npm run build`

Buildea la aplicación para produción en la carpeta `build`.\

Para probar el build, sería necesario levantarlo en un servidor estático, para ello instalamos `serve`.

`npm i -g serve`

y lo lanzamos con:

`serve -s build`

Como se ha utilizado create-react-app, esta funcionalidad ya venía.
Para realizar este paso, habría utilizado webpack.

Para el modo development, no habría hecho falta nada, ya que es sin minificar ni concatenar.

Para el modo production, habría utilizado `UglifyJSPlugin` para minimizar los assets y `CommonsChunkPlugin` para concatenarlos.

## Librerias utilizadas

Se ha utilizado `eslint` con la guía de estilos de Airbnb para el linter.
Se ha utilizado `prettier` para la gestión de errores de código y buenas practicas.