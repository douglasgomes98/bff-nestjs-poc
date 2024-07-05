deps:
	rm -rf node_modules
	pnpm install

proto:
	rm -rf src/grpc/generated
	mkdir src/grpc/generated
	pnpm protoc \
	--plugin=./node_modules/.bin/protoc-gen-ts_proto \
	--ts_proto_out=./src/grpc/generated \
  -I ./src/grpc/proto \
  ./src/grpc/proto/*.proto \
	--ts_proto_opt=unrecognizedEnum=false,stringEnums=true,snakeToCamel=false \
	--ts_proto_opt=nestJs=true,addGrpcMetadata=true,returnObservable=true,lowerCaseServiceMethods=false
	pnpm prettier --write src/grpc/generated

container: deps proto
	docker build -t bff-nestjs .
