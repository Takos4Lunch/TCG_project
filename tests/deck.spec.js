const sequelize = require("../libs/sequelize")
const sinon = require('sinon');
const rewire = require('rewire');
const boom = require('@hapi/boom');
const { Deck } = require('../db/models/deck.model')
const deckService = require('../services/deck.service')

describe('Deck services tests', () => {
    let deckSample
    let deckModelInstanceSample

    beforeEach(() => {
        deckSample = {
            id: '1',
            currentCards: '5',
            coverImgUrl: 'https://example.com/images/cover'
        }

        deckModelInstanceSample = Deck.build({
            id: 1,
            currentCards: 3,
            coverImgUrl: 'https://example.com/id=1&cover'
        })

        findAllStub = sinon.stub(sequelize.models.Deck, 'findAll').resolves(deckSample);

        findOneStub = sinon.stub(sequelize.models.Deck, 'findOne').resolves(deckModelInstanceSample)
    })

    afterEach(()=>{
        deckService = rewire('../services/deck.service');
        sinon.restore();
    })
})