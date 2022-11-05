

# 환경: 

* nestjs (Swagger/Typeorm/HttpModule)
* Mysql 8.0 ,Mysql Workbench
* 번역(NAVER PAPAGO API)
* 환율 정보 조회 (한국수출입 은행 API) (https://www.koreaexim.go.kr/ir/HPHKIR020M01?apino=2&viewtype=C&searchselect=&searchword=)

**app.module.ts db 설정 정보 수정 필요**

` 
  TypeOrmModule.forRoot({
                    type: 'mysql',
                    host: '127.0.0.1',
                    port: 3306,
                    username: 'goods',
                    password: '',
                    database: 'goods_db',
`

# API 정보

**과제설명 파일에 안내 된 번역 API 링크가 접근이 안되서 네이버 신규 앱 등록 후 새로 키 발급하여 파파고 API 개발 진행 하였습니다.**

* API 정보/Url:(http://localhost:3000/api) 
  * [상품 전체 조회 - 등록 된 상품을 전체 조회 합니다. ] 
    (http://localhost:3000/api#/Goods/GoodsController_GetAllGoods)
  * [상품 조회 - 상품 번호로 상품을 조회 합니다.]
    (http://localhost:3000/api#/Goods/GoodsController_GetGoods)
  * [전시 가능상품 조회 - 상태가 검수 완료인 상품들만 조회 합니다]
    (http://localhost:3000/api#/Goods/GoodsController_GetListingGoods)
  * [상품 수정 - 상품 번호로 원하는 상품을 수정 합니다. ] 
    (http://localhost:3000/api#/Goods/GoodsController_EditGoods)
  * [상품 등록 - 상품 등록 Api(상품 제목 , 상품 상세의 영문/중국어는 자동으로 번역되어 등록 됩니다.] 
    (http://localhost:3000/api#/Goods/GoodsController_InsertGoods)
  * [상품 검수 - 상품 상태 (검수요청 : 0 , 대기 : 10 , 검수 완료 : 20 , 검수 보류 : 30 이외 값 요청 시 예외 발생) 초기 등록 시 0 으로 등록]
    (http://localhost:3000/api#/Goods/GoodsController_EditStats)

## API List 화면
![image](https://user-images.githubusercontent.com/40415473/193989774-de4af925-ed17-4939-ba00-d826c117ba26.png)

## 전체 조회 화면
![image](https://user-images.githubusercontent.com/40415473/193990002-0fa471df-baaf-4c46-9634-e1b77399196f.png)

## 상품 조회 화면 
![image](https://user-images.githubusercontent.com/40415473/193990140-af492c36-c53f-470f-a2eb-356080ad24d7.png)

## 상품 등록 
![image](https://user-images.githubusercontent.com/40415473/193990774-814f0e17-7701-4a8f-a0f7-4b7d611b7556.png)

## 상품 수정 
![image](https://user-images.githubusercontent.com/40415473/193990914-259799d4-b234-45c0-bdfd-4d712a790a4d.png)

## 상품 검수 
![image](https://user-images.githubusercontent.com/40415473/193991628-8c339548-0bca-4d4c-bd78-1c7ef6faa816.png)
