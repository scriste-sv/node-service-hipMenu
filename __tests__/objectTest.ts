export const objectTest: Object = {
	"type": "Restaurant",
	"name": "Test",
	"menu":[
		{ 
		"name": "Desert"
		},
		{ 
		"name": "Main dish"
		},
		{ 
		"name": "TEST"
		}
	]
}

export const objectTestUpdated: Object = {
	"type": "Restaurant",
	"name": "Test2",
	"menu":[
		{ 
		"name": "Desert"
		},
		{ 
		"name": "Main dish"
		},
		{ 
		"name": "TEST2"
		}
	]
}

describe('To please jest', () => {
    it('test', () => {
        expect(1).toBe(1);
    })
})