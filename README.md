# Hướng dẫn cài đặt

## Môi trường

-   [Nodejs](https://nodejs.org/en)

## Thiết lập biến môi trường

Copy file `.env.example` thành file `.env` và chỉnh sửa các giá trị trong đó cho phù hợp:

-   `NEXT_PUBLIC_FIREBASE_API_KEY`
-   `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
-   `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
-   `NEXT_PUBLIC_NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
-   `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
-   `NEXT_PUBLIC_FIREBASE_APP_ID`
-   `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
-   `NEXT_PUBLIC_BACKENDURL`: Địa chỉ của backend, lưu ý kết thúc bằng "/"

## Cài đặt các gói thư viện

```sh
npm i
```

## Chạy dự án trong môi trường phát triển

```sh
npm run dev
```

## Build dự án thành bản production

```sh
npm run build
```

## Chạy dự án bản production (Sau khi đã build)

```sh
npm start
```
