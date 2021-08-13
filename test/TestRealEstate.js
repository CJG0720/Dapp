var RealEstate = artifacts.require("./RealEstate.sol");

//컨트랙트를 테스트 할 것인데 두 개의 인자(이름, 함수를 받음)
//계정이라는 이름을 콜백으로 받는 함수 
contract('RealEstate',function(accounts) {
    var realEstateInstance;
    //전역변수 선언 

    //it()을 통해 무슨 내용의 테스트를 할것인지 정의
    it("컨트랙의 소유자 초기화 테스팅", function() {
        return RealEstate.deployed().then(function(instance) {
            //만약 배포가 되었다면 콜백함수로 인스턴스를 받고,
            // 전역변수에 저장, owner를 불러와서 반환
            realEstateInstance = instance;
            return realEstateInstance.owner.call();
        }).then(function(owner) {	
            //then 을 통해 owner를 받고 assert 를 이용해서 비교한다. 다르면 에러 메세지 세  가지가 들어온다. 
            //리턴된 실제값(소문자) . 대문자화
            //가나슈의 첫 번째 계정(배포할때 쓴 계정)(대소문자) . 대문자화
            //Error msg 적어준다.             
            assert.equal(
                owner.toUpperCase(),
                accounts[0].toUpperCase(), "owner가 가나슈 계정과 동일하지 않습니다."
            );
        });
    });

    it("가나슈 두 번째 계정으로 매물 아이디 0번 매입 후,이벤트 생성 및 매입자 정보와 buyers 배열 테스팅", function() {
        return RealEstate.deployed().then(function(instance) {
            realEstateInstance = instance;
            return realEstateInstance.buyRealEstate(0, "yoonhoi",24,{from : accounts[1],value : web3.toWei(1.50, "ether")});
            //어느 계정으로 함수를 불러들이는지, 1.5를 오너에게~ 보냅시당
        }).then(function(receipt) {// 매입성공시 then을 통해 영수증을 받는다. 
            //콜백으로 받은 receipt를 통해 
            //1. 이벤트가 생성되었는지 확인합니다. 로그의 길이, 예상값1, 생성 되었다는 뜻,ERRORMSG
            assert.equal(receipt.logs.length, 1, "이벤트 하나가 생성되지 않았습니다. ");
            //event, 예상값은 Log Buy Real Estate 
            assert.equal(receipt.logs[0].event, "LogBuyRealEstate", "이벤트가 LogBuyRealEstate가 아닙니다. ");
            //매입자 계정이 1번인지 확인합니댱가나슈 두 번째 계정 
            assert.equal(receipt.logs[0].args._buyer, accounts[1], "매입자가 가나슈 두 번째 계정이 아닙니다. ");
            
            assert.equal(receipt.logs[0].args._id, 0, "매물 아이디가 0 이 아닙니다. ");
            //이벤트 관련 테스트 여기까지, 읽기전용 함수를 합니당
            return realEstateInstance.getBuyerInfo(0);
        }).then(function(buyerInfo) {
            //getBuyerInfo는 세개의 필드를 리턴하는데 각각을 잘 리턴하는지 확인할 것이다. 
            assert.equal(buyerInfo[0].toUpperCase(), accounts[1].toUpperCase(), "매입자의 계정이 가나슈 두번째 계정과 일치하지 않습니다. ")
            //실제값이 헥스로 리턴된다 bytes32타입 ==> 아스키 코드로 변환
            //뒤에 00000 빈공간을 '' 바꿔줘야 한다. 
            assert.equal(web3.toAscii(buyerInfo[1]).replace(/\0/g,''), "yoonhoi","매입자의 이름이 yoonhoi이 아닙니다. ");
            return realEstateInstance.getAllBuyers()
        }).then(function(buyers) {
            assert.equal(buyers[0].toUpperCase(), accounts[1].toUpperCase(), "Buyers 배열 첫 번째 인덱스의 계정이 가나슈 두 번째 계정과 일치하지 않습니다. ");
        });
    })
})