pragma solidity ^0.4.23;

contract RealEstate {
    // 매입자의 정보를 struct로 저장하고 나중에 한꺼번에 가져올 것이다. 
    struct Buyer { 
        address buyerAddress;
        bytes32 name;
        uint age;
    }

    mapping(uint => Buyer) public buyerInfo;
    address public owner;
    address[10] public buyers; //상태변수로 고정타입의 배열 선언. 

    //event
    event LogBuyRealEstate(
        address _buyer,
        uint _id
    );
    
    // 이벤트의 이름을 명시합니다. 
    // 어떤 이벤트가 생성되었을때 이벤트의 내용도 블록에 저장이 된다. 
    // frontend에서 어떤 계정에서 몇번 매물을 샀다고 알려줄 것이다. 계정 주소와 아이디가 필요하다.

    constructor() public { 
        owner = msg.sender;
    }

    //매물의 아이디, 메물의 이름, 매입자 나이 세 개를 받는다 
    // 고정사이즈 타입 
    // 가시성, 타입제어자 
    // payable 이더를 받아야 할 때 쓴다. 
    // 매입자가 매입했을 때 메타마스크가 뜨고 매입가를(이더) 이 함수로 보내는 것이다. 
    function buyRealEstate(uint _id,bytes32 _name,uint _age) public payable {
        require(_id >=0 && _id<=9); // id는 0~9 사이인지 체크를 합니다 
        							// require 키워드 사용
        buyers[_id] = msg.sender;	// 매물을 사려고 하는 사람을 입력한다. msg.sender는 함수를 사용하고 있는 계정,
        							// 매개변수로 받은 아이디를 이용해서 저장을 할 것이다. 
        buyerInfo[_id] = Buyer(msg.sender, _name, _age);
        
        owner.transfer(msg.value); //이더를 계정에서 계정으로 이동할 때 transfer를 사용한다. msg.value는 wei 만 허용한다. 
        
    }
}
