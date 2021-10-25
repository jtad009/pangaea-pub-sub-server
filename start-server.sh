curl -X POST -H "Content-Type: application/json" -d '{ "url": "http://localhost:9000/test1"}' http://localhost:3000/subscriber-controller/subscribe/topic1 

curl -X POST -H "Content-Type: application/json" -d '{ "url": "http://localhost:9000/test2"}' http://localhost:3000/subscriber-controller/subscribe/topic1 

curl -X POST -H "Content-Type: application/json" -d '{"message": "hello"}' http://localhost:3000/pub-controller/publish/topic1