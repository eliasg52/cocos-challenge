# COCOS CHALLENGE

## Requisitos previos

- Node.js versión 18.x o 20.x (recomendado: v20.11.0)
- Xcode (para iOS)
- Android Studio (para Android)
- Git

## Pasos para arrancar el proyecto

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/eliasg52/cocos-challenge.git
   cd cocos-challenge
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Generar archivos nativos**

   ```bash
   npx expo prebuild
   ```

4. **Iniciar la aplicación**

   Para iOS:

   ```bash
   npm run ios
   ```

   Para Android:

   ```bash
   npm run android
   ```

## Notas adicionales

- Este proyecto utiliza Expo como framework base y React Native
- La estructura del proyecto sigue el patrón de enrutamiento basado en archivos (file-based routing)

## Funcionalidades principales

- Visualización de instrumentos financieros
- Simulación de compra y venta
- Seguimiento de órdenes históricas
- Soporte para modo oscuro y claro

## Decisiones Técnicas

Durante el desarrollo de esta aplicación, se tomaron las siguientes decisiones técnicas para garantizar una experiencia de usuario óptima y un código mantenible:

### Experiencia de Usuario

- **Implementación de Skeletons**: Se incorporaron componentes de tipo "skeleton" tanto en la sección de instrumentos como en el portfolio para mejorar la experiencia de usuario durante la carga de datos, proporcionando una indicación visual del contenido que se está cargando.

- **Sistema de Loaders**: Se implementaron indicadores de carga en todas las secciones críticas de la aplicación para proporcionar feedback continuo al usuario durante las operaciones que requieren tiempo de procesamiento.

- **Debounce en Búsquedas**: Se aplicó la técnica de debounce en el buscador de instrumentos para optimizar el rendimiento, reduciendo el número de llamadas a la API y mejorando la eficiencia del sistema.

- **Visualización de Portfolio**: Además de la vista en lista tradicional, se desarrolló una visualización en forma de gráfico para el portfolio, permitiendo al usuario interpretar de manera más intuitiva la distribución de sus inversiones.

### Arquitectura y Estado

- **Gestión de Estado con Zustand**: Se implementó Zustand como solución para la gestión del estado global de la aplicación, específicamente para el manejo de órdenes creadas, proporcionando una alternativa ligera y eficiente a Redux.

- **Persistencia con AsyncStorage**: Para garantizar la persistencia de datos entre sesiones, se utilizó AsyncStorage para almacenar localmente las órdenes creadas y las preferencias de tema seleccionadas por el usuario.

- **Optimización de Peticiones con React Query**: Se integró React Query para gestionar el cacheo de las peticiones HTTP, mejorando significativamente los tiempos de respuesta y reduciendo la carga en el servidor al evitar peticiones redundantes.

### Organización y Calidad del Código

- **Arquitectura Modular para API**: Se desarrolló un módulo específico para centralizar todas las llamadas a la API, facilitando el mantenimiento y la escalabilidad del código al tener las peticiones aisladas en archivos específicos.

- **Tipado Estricto con TypeScript**: Se implementó un sistema de tipado estricto para la mayoría de las funciones y peticiones, mejorando la robustez del código, facilitando el desarrollo y reduciendo la probabilidad de errores en tiempo de ejecución.
