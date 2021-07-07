import {MillionsTokenQuery} from './service'


// use secrets exp: (wrangler secret put APPLICATIONID)
const applicationID = APPLICATIONID;
const applicationSecret = APPLICATIONSECRET;
const publicKey = PUBLICKEY;

import {
  createSlashCommandHandler,
  ApplicationCommand,
  InteractionHandler,
  Interaction,
  InteractionResponse,
  InteractionResponseType,
  EmbedType,
  //ApplicationCommandOptionType,
} from '@glenstack/cf-workers-discord-bot'

const Holders: ApplicationCommand = {
  name: 'holders',
  description: 'Show Holders'
}

const Price: ApplicationCommand = {
  name: 'price',
  description: 'Show Price'
}

const holdersHandler: InteractionHandler = async (
  interaction: Interaction,
): Promise<InteractionResponse> => {
  const userID = interaction.member.user.id
  const Holders = await (await MillionsTokenQuery()).Holders;

  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: `Number Of Holders : ${Holders}`,
      allowed_mentions: {
        users: [userID],
      },
    },
  }
}

const priceHandler: InteractionHandler = async (
  interaction: Interaction,
): Promise<InteractionResponse> => {
  const userID = interaction.member.user.id
  const Price = await (await MillionsTokenQuery()).Price;

  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      content: `Current Price is : ${Price}`,
      allowed_mentions: {
        users: [userID],
      },
    },
  }
}


const slashCommandHandler = createSlashCommandHandler({
  applicationID,
  applicationSecret,
  publicKey,
  commands: [[Holders, holdersHandler],[Price, priceHandler]],
})

addEventListener('fetch', (event) => {
  event.respondWith(slashCommandHandler(event.request))
})
