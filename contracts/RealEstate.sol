pragma solidity ^0.4.23;

contract RealEstate {
    struct Buyer {
        address buyerAddress;
        bytes32 name;
        uint age;
    }

    mapping(uint => Buyer) public buyerInfo;
    address public owner;
    address[10] public buyers;

    event LogBuyRealEstate(
        address _buyer,
        uint _id

    );

    constructor() public {
        owner = msg.sender; //배포 과정에서 생성자 호출 -> 해당 라인 읽음 -> msg.sender() 값을 owner에 대입
    } 

    //매물구입함수
    function buyRealEstate(uint _id, bytes32 _name, uint _age) public payable {
        require(_id >= 0 && _id <= 9); //매물 아이디 0~9 확인
        buyers[_id] = msg.sender;      //msg.sender가 함수를 사용하는 사람임
        buyerInfo[_id] = Buyer(msg.sender, _name, _age);
    
        owner.transfer(msg.value);
        emit LogBuyRealEstate(msg.sender, _id);
    }

    function getBuyerInfo(uint _id) public view returns (address, bytes32, uint) {
        Buyer memory buyer = buyerInfo[_id];
        return (buyer.buyerAddress, buyer.name, buyer.age);
    }

    function getAllBuyers() public view returns (address[10]) {
        return buyers;
    }
}