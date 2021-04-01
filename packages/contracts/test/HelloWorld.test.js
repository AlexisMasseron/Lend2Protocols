const HelloWorld = artifacts.require("HelloWorld");

contract("HelloWorld", accounts => {
    it("should have `Hello World` as `message`", async () => {
        const helloWorld = await HelloWorld.deployed();
        const message = await helloWorld.message();
        assert.equal(
            message,
            "Hello World"
        );
    });
});