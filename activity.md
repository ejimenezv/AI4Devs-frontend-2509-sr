✍️ Creando la interfaz de gestión de aplicaciones de LTI 🔴


En LTI ya tenemos la funcionalidad para listar las diferentes posiciones requeridas por la empresa. Está disponible en una pagina "positions" que muestra una lista de tarjetas que describen cada posición. Cuenta con filtros para poder buscar por texto, fecha límite, estado y manager responsable:

![positions.avif](positions.avif "Lista de posiciones")


Queremos que al hacer clic en el botón "Ver proceso" de cualquiera de las posiciones, nos lleve a la vista de detalle de cada posición, denominada "position".

1. Descarga el repositorio base de Github
Apóyate en el repositorio base para este ejercicio:

https://github.com/ejimenezv/AI4Devs-frontend-2509-sr



2. Realiza el ejercicio
Tu misión en este ejercicio es crear la interfaz "position", una página en la que poder visualizar y gestionar los diferentes candidatos de una posición específica.

Se ha decidido que la interfaz sea tipo kanban, mostrando los candidatos como tarjetas en diferentes columnas que representan las fases del proceso de contratación, y pudiendo actualizar la fase en la que se encuentra un candidato solo arrastrando su tarjeta.Aquí tienes un ejemplo de interfaz posible:

![example.avif](example.avif "Ejemplo")


Algunos de los requerimientos del equipo de diseño que se pueden ver en el ejemplo son:

Se debe mostrar el título de la posición en la parte superior, para dar contexto

Añadir una flecha a la izquierda del título que permita volver al listado de posiciones

Deben mostrarse tantas columnas como fases haya en el proceso

La tarjeta de cada candidato/a debe situarse en la fase correspondiente, y debe mostrar su nombre completo y su puntuación media

Si es posible, debe mostrarse adecuadamente en móvil (las fases en vertical ocupando todo el ancho)

Algunas observaciones:

Asume que la página de posiciones la encuentras 

Asume que existe la estructura global de la página, la cual incluye los elementos comunes como menú superior y footer. Lo que estás creando es el contenido interno de la página.

Para implementar la funcionalidad de la página cuentas con diversos endpoints API que ha preparado el equipo de backend:

GET /positions/:id/interviewFlow
Este endpoint devuelve información sobre el proceso de contratación para una determinada posición:

positionName: Título de la posición

interviewSteps: id y nombre de las diferentes fases de las que consta el proceso de contratación

{
      "positionName": "Senior backend engineer",
      "interviewFlow": {
              
              "id": 1,
              "description": "Standard development interview process",
              "interviewSteps": [
                  {
                      "id": 1,
                      "interviewFlowId": 1,
                      "interviewTypeId": 1,
                      "name": "Initial Screening",
                      "orderIndex": 1
                  },
                  {
                      "id": 2,
                      "interviewFlowId": 1,
                      "interviewTypeId": 2,
                      "name": "Technical Interview",
                      "orderIndex": 2
                  },
                  {
                      "id": 3,
                      "interviewFlowId": 1,
                      "interviewTypeId": 3,
                      "name": "Manager Interview",
                      "orderIndex": 2
                  }
              ]
          }
  }
GET /positions/:id/candidates
Este endpoint devuelve todos los candidatos en proceso para una determinada posición, es decir, todas las aplicaciones para un determinado positionID. Proporciona la siguiente información:

name: Nombre completo del candidato

current_interview_step: en qué fase del proceso está el candidato.

score: La puntuación media del candidato

[
      {
           "fullName": "Jane Smith",
           "currentInterviewStep": "Technical Interview",
           "averageScore": 4
       },
       {
           "fullName": "Carlos García",
           "currentInterviewStep": "Initial Screening",
           "averageScore": 0            
       },        
       {
           "fullName": "John Doe",
           "currentInterviewStep": "Manager Interview",
           "averageScore": 5            
      }    
 ]

 
PUT /candidates/:id/stage
Este endpoint actualiza la etapa del candidato movido. Permite modificar la fase actual del proceso de entrevista en la que se encuentra un candidato específico, a través del parámetro "new_interview_step" y proporionando el interview_step_id correspondiente a la columna en la cual se encuentra ahora el candidato.

{
     "applicationId": "1",
     "currentInterviewStep": "3"
 }
{    
    "message": "Candidate stage updated successfully",
     "data": {
         "id": 1,
         "positionId": 1,
         "candidateId": 1,
         "applicationDate": "2024-06-04T13:34:58.304Z",
         "currentInterviewStep": 3,
         "notes": null,
         "interviews": []    
     }
 }
 

3. Entrega el ejercicio
Esperamos tu entrega como un pull request en el repositorio que  incluya:

Los cambios de páginas, lógica, etc. en la carpeta /frontend

Un fichero prompts-EJV.md en la carpeta prompts.

Para ello, debes seguir los siguientes pasos una vez ya tengas el repositorio preparado como se ha explicado en el paso anterior:

Completar el ejercicio: rellenar el prompt y el código necesario en frontend

Crear una nueva rama para tu entregable con el nombre frontend-EJV

Hacer commit

⁠Git push

En la interfaz de tu repositorio te saldrá un aviso arriba para hacer ⁠Pull request

En caso de que falle, puedes enviar el proyecto en zip por correo a dago@lidr.es.

Si tienes dudas sobre el ejercicio, consúltalas en el grupo de whatsapp para que podamos apoyarte lo más rápido posible, y que otr@s compañer@s también la resuelvan.

Por último, no olvides añadir tus prompts en prompts.md dentro de la carpeta prompts. 
   

¡A por ello!