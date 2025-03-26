# COCOS - Trading App

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
