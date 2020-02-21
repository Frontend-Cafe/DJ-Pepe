URL a reproducir ñeri:
https://www.youtube.com/watch?v=34CZjsEI1yU
VoiceState {
  guild: <ref *1> Guild {
    members: GuildMemberManager {
      cacheType: [Function: Collection],
      cache: [Collection [Map]],
      guild: [Circular *1]
    },
    channels: GuildChannelManager {
      cacheType: [Function: Collection],
      cache: [Collection [Map]],
      guild: [Circular *1]
    },
    roles: RoleManager {
      cacheType: [Function: Collection],
      cache: [Collection [Map]],
      guild: [Circular *1]
    },
    presences: PresenceManager {
      cacheType: [Function: Collection],
      cache: [Collection [Map]]
    },
    voiceStates: VoiceStateManager {
      cacheType: [Function: Collection],
      cache: [Collection [Map]],
      guild: [Circular *1]
    },
    deleted: false,
    available: true,
    id: '364084642824847362',
    shardID: 0,
    name: '#OpenEFI',
    icon: null,
    splash: null,
    region: 'brazil',
    memberCount: 3,
    large: false,
    features: [],
    applicationID: null,
    afkTimeout: 300,
    afkChannelID: null,
    systemChannelID: '364084642824847364',
    embedEnabled: undefined,
    premiumTier: 0,
    premiumSubscriptionCount: 0,
    verificationLevel: 0,
    explicitContentFilter: 0,
    mfaLevel: 0,
    joinedTimestamp: 1574021328613,
    defaultMessageNotifications: 'ALL',
    systemChannelFlags: SystemChannelFlags { bitfield: 0 },
    vanityURLCode: null,
    description: null,
    banner: null,
    ownerID: '277086414917599232',
    emojis: GuildEmojiManager {
      cacheType: [Function: Collection],
      cache: Collection(0) [Map] {},
      guild: [Circular *1]
    }
  },
  id: '277086414917599232',
  serverDeaf: false,
  serverMute: false,
  selfDeaf: false,
  selfMute: true,
  sessionID: '2b7efd6ac7dfa7bcc8b338b21ddb1132',
  streaming: false,
  channelID: '364084642824847366'
}
{
  textChannel: <ref *1> TextChannel {
    type: 'text',
    deleted: false,
    id: '364084642824847364',
    name: 'general',
    rawPosition: 0,
    parentID: '364084642824847363',
    permissionOverwrites: Collection(0) [Map] {},
    topic: null,
    nsfw: undefined,
    lastMessageID: '680257259796037749',
    rateLimitPerUser: 0,
    lastPinTimestamp: null,
    guild: Guild {
      members: [GuildMemberManager],
      channels: [GuildChannelManager],
      roles: [RoleManager],
      presences: [PresenceManager],
      voiceStates: [VoiceStateManager],
      deleted: false,
      available: true,
      id: '364084642824847362',
      shardID: 0,
      name: '#OpenEFI',
      icon: null,
      splash: null,
      region: 'brazil',
      memberCount: 3,
      large: false,
      features: [],
      applicationID: null,
      afkTimeout: 300,
      afkChannelID: null,
      systemChannelID: '364084642824847364',
      embedEnabled: undefined,
      premiumTier: 0,
      premiumSubscriptionCount: 0,
      verificationLevel: 0,
      explicitContentFilter: 0,
      mfaLevel: 0,
      joinedTimestamp: 1574021328613,
      defaultMessageNotifications: 'ALL',
      systemChannelFlags: [SystemChannelFlags],
      vanityURLCode: null,
      description: null,
      banner: null,
      ownerID: '277086414917599232',
      emojis: [GuildEmojiManager]
    },
    messages: MessageManager {
      cacheType: [Function: LimitedCollection],
      cache: [LimitedCollection [Map]],
      channel: [Circular *1]
    },
    _typing: Map(0) {}
  },
  voiceChannel: VoiceChannel {
    type: 'voice',
    deleted: false,
    id: '364084642824847366',
    name: 'General',
    rawPosition: 0,
    parentID: '364084642824847365',
    permissionOverwrites: Collection(0) [Map] {},
    bitrate: 64000,
    userLimit: 0,
    guild: Guild {
      members: [GuildMemberManager],
      channels: [GuildChannelManager],
      roles: [RoleManager],
      presences: [PresenceManager],
      voiceStates: [VoiceStateManager],
      deleted: false,
      available: true,
      id: '364084642824847362',
      shardID: 0,
      name: '#OpenEFI',
      icon: null,
      splash: null,
      region: 'brazil',
      memberCount: 3,
      large: false,
      features: [],
      applicationID: null,
      afkTimeout: 300,
      afkChannelID: null,
      systemChannelID: '364084642824847364',
      embedEnabled: undefined,
      premiumTier: 0,
      premiumSubscriptionCount: 0,
      verificationLevel: 0,
      explicitContentFilter: 0,
      mfaLevel: 0,
      joinedTimestamp: 1574021328613,
      defaultMessageNotifications: 'ALL',
      systemChannelFlags: [SystemChannelFlags],
      vanityURLCode: null,
      description: null,
      banner: null,
      ownerID: '277086414917599232',
      emojis: [GuildEmojiManager]
    }
  },
  connection: <ref *2> VoiceConnection {
    _events: [Object: null prototype] {
      closing: [Array],
      debug: [Function (anonymous)],
      failed: [Function],
      disconnect: [Function]
    },
    _eventsCount: 4,
    _maxListeners: undefined,
    voiceManager: ClientVoiceManager {
      connections: [Collection [Map]],
      broadcasts: []
    },
    channel: VoiceChannel {
      type: 'voice',
      deleted: false,
      id: '364084642824847366',
      name: 'General',
      rawPosition: 0,
      parentID: '364084642824847365',
      permissionOverwrites: Collection(0) [Map] {},
      bitrate: 64000,
      userLimit: 0,
      guild: [Guild]
    },
    status: 0,
    speaking: Speaking { bitfield: 0 },
    authentication: {
      sessionID: '917bcde57c8a34d73edba6cd385d0393',
      token: '94f27de655c63935',
      endpoint: 'brazil184.discord.media',
      ssrc: 10,
      port: 54479,
      modes: [Array],
      ip: '172.107.227.90',
      experiments: [Array],
      mode: 'xsalsa20_poly1305_lite',
      video_codec: 'VP8',
      secret_key: [Uint8Array],
      media_session_id: '71e226661924f6340e418cc79c6b5259',
      audio_codec: 'opus'
    },
    player: AudioPlayer {
      _events: [Object: null prototype],
      _eventsCount: 2,
      _maxListeners: undefined,
      dispatcher: null,
      streamingData: [Object],
      voiceConnection: [Circular *2],
      [Symbol(kCapture)]: false
    },
    ssrcMap: Map(0) {},
    _speaking: Map(0) {},
    sockets: { ws: [VoiceWebSocket], udp: [VoiceConnectionUDPClient] },
    receiver: VoiceReceiver {
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      connection: [Circular *2],
      packets: [PacketHandler],
      [Symbol(kCapture)]: false
    },
    connectTimeout: Timeout {
      _idleTimeout: -1,
      _idlePrev: null,
      _idleNext: null,
      _idleStart: 10573,
      _onTimeout: null,
      _timerArgs: undefined,
      _repeat: null,
      _destroyed: true,
      [Symbol(refed)]: true,
      [Symbol(asyncId)]: 4552,
      [Symbol(triggerId)]: 0
    },
    [Symbol(kCapture)]: false
  },
  songs: [
    {
      title: 'WIND ROSE - Diggy Diggy Hole (Official Video) | Napalm Records',
      url: 'https://www.youtube.com/watch?v=34CZjsEI1yU'
    }
  ],
  volume: 2.14,
  playing: true
}