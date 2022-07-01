module.exports = {
    // WARNING: for future use
    _userCheck(message, client, client1) {
        const vcChannel = message.member.voice.channel;
        if (!vcChannel) {
            /**
             * user is not in any voice channel
             * throw an error because music cannot play
             */
            throw Error("Please join one of the voice channels to play music.");
        }

        // get instances of queue
        // undefined if the queue is not yet created
        let q1 = client.player.getQueue(message.guild.id);
        let q2 = client1.player.getQueue(message.guild.id);

        if (q1) { // check if player 1 is playing
            /**
             * player 1 is playing
             */
            if (q1.data.msgChannel == message.channel) { // check if original text channel for player 1
                /**
                 * player 1 is playing
                 * is original text channel for player 1
                 */
                if (q1.connection.channel == vcChannel) { // check if original voice channel for player 1
                    /**
                     * player 1 is playing
                     * is original text channel for player 1
                     * is original voice channel for player 1
                     * add song to q1!
                     */
                    return q1;
                } else {
                    /**
                     * player 1 is playing
                     * is original text channel for player 1
                     * not original voice channel for player 1
                     * user might be in a different voice channel with player 2
                     */
                    if (q2) { // check if player 2 is playing
                        /**
                         * player 1 is playing
                         * is original text channel for player 1
                         * not original voice channel for player 1
                         * player 2 is playing
                         */
                        if (q2.data.msgChannel == message.channel) { // check if original text channel for player 2
                            /**
                             * player 1 is playing
                             * is original text channel for player 1
                             * not original voice channel for player 1
                             * player 2 is playing
                             * is original text channel for player 2
                             */
                            if (q2.connection.channel == vcChannel) { // check if orginal voice channel for player 2
                                /**
                                 * player 1 is playing
                                 * is original text channel for player 1
                                 * not original voice channel for player 1
                                 * player 2 is playing
                                 * is original text channel for player 2
                                 * is original voice channel for player 2
                                 * add song to q2!
                                 */
                                return q2;
                            } else {
                                /**
                                 * player 1 is playing
                                 * is original text channel for player 1
                                 * not original voice channel for player 1
                                 * player 2 is playing
                                 * is original text channel for player 2
                                 * not original voice channel for player 2
                                 * user is not in any of the required voice channels
                                 * ask to join either channel
                                 */
                                throw Error(`Music playing in other channels.\nJoin ${q1.connection.channel} or ${q2.connection.channel}, or wait for them to finish.`);
                            }
                        } else {
                            /**
                             * player 1 is playing
                             * is original text channel for player 1
                             * not original voice channel for player 1
                             * player 2 is playing
                             * not original text channel for player 2
                             */
                            if (q2.voicechannel == message.voicechannel) { // check if original voice channel for player 2
                                /**
                                 * player 1 is playing
                                 * is original text channel for player 1
                                 * not original voice channel for player 1
                                 * player 2 is playing
                                 * not original text channel for player 2
                                 * is original voice channel for player 2
                                 * ask to head to original text channel
                                 */
                                throw Error(`The queue was created in another text channel.\nHead to channel ${q2.data.msgChannel} for music commands.`);
                            } else {
                                /**
                                 * player 1 is playing
                                 * is original text channel for player 1
                                 * not original voice channel for player 1
                                 * player 2 is playing
                                 * not original text channel for player 2
                                 * not original voice channel for player 2
                                 * ask to join either voice channel
                                 */
                                throw Error(`Music playing in other channels.\nJoin ${q1.connection.channel} or ${q2.connection.channel}, or wait for them to finish.`);
                            }
                        }
                    } else {
                        /**
                         * player 1 is playing
                         * is original text channel for player 1
                         * not original voice channel for player 1
                         * player 2 is not playing
                         * spawn player 2 and play
                         */
                        return q2; // this would be undefined
                    }
                }
            } else {
                /**
                 * player 1 is playing
                 * not original text channel for player 1
                 */
                if (q1.voicechannel == message.voicechannel) { // check if original voice channel for player 1
                    /**
                     * player 1 is playing
                     * not original text channel for player 1
                     * is original voice channel
                     * throw wrong text channel error
                     */
                    throw Error(`The queue was created in another text channel.\nHead to channel ${q1.data.msgChannel} for music commands.`);
                } else {
                    /**
                     * player 1 is playing
                     * not original text channel for player 1
                     * not original voice channel
                     * check player 2
                     */
                    if (q2) { // check if player 2 is playing
                        /**
                         * player 1 is playing
                         * not original text channel for player 1
                         * not original voice channel
                         * player 2 is playing
                         */
                        if (q2.textchannel == message.textchannel) { // check if original text channel for player 2
                            /** 
                             * player 1 is playing
                             * not original text channel for player 1
                             * not original voice channel
                             * player 2 is playing
                             * is original text channel for player 2
                             */
                            if (q2.voicechannel == message.voicechannel) { // check if original voice channel for player 2
                                /** 
                                 * player 1 is playing
                                 * not original text channel for player 1
                                 * not original voice channel
                                 * player 2 is playing
                                 * is original text channel for player 2
                                 * is original voice channel for player 2
                                 * add music to player 2
                                 */
                                return q2;
                            } else {
                                /** 
                                 * player 1 is playing
                                 * not original text channel for player 1
                                 * not original voice channel
                                 * player 2 is playing
                                 * is original text channel for player 2
                                 * not original voice channel for player 2
                                 * not in any of the voice channel
                                 * ask to join either
                                 */
                                throw Error(`Music playing in other channels.\nJoin ${q1.connection.channel} or ${q2.connection.channel}, or wait for them to finish.`);
                            }
                        } else {
                            /** 
                             * player 1 is playing
                             * not original text channel for player 1
                             * not original voice channel
                             * player 2 is playing
                             * not original text channel for player 2
                             */
                            if (q2.voicechannel == message.voicechannel) { // check if original voice channel for player 2
                                /** 
                                 * player 1 is playing
                                 * not original text channel for player 1
                                 * not original voice channel
                                 * player 2 is playing
                                 * not original text channel for player 2
                                 * is original voice channel for player 2
                                 * ask to head to the original text channel
                                 */
                                throw Error(`The queue was created in another text channel.\nHead to channel ${q2.data.msgChannel} for music commands.`);
                            } else {
                                /** 
                                 * player 1 is playing
                                 * not original text channel for player 1
                                 * not original voice channel
                                 * player 2 is playing
                                 * not original text channel for player 2
                                 * not original voice channel for player 2
                                 * ask to join either voice channel
                                 */
                                throw Error(`Music playing in other channels.\nJoin ${q1.connection.channel} or ${q2.connection.channel}, or wait for them to finish.`);
                            }
                        }
                    } else {
                        /**
                         * player 1 is playing
                         * not original text channel for player 1
                         * not original voice channel
                         * player 2 is not playing
                         * spawn player 2 to play
                         */
                        return q2; // this would be undefined
                    }
                }
            }
        } else {
            // player 1 is not playing
            if (q2) { // check if player 2 is playing
                /**
                 * player 1 is not playing
                 * play 2 is playing
                 */
                if (q2.textchannel == message.textchannel) { // check if original text channel for player 2
                    /**
                     * player 1 is not playing
                     * play 2 is playing
                     * is original text channel for player 2
                     */
                    if (q2.voicechannel == message.voicechannel) { // check if original voice channel for player 2
                        /**
                         * player 1 is not playing
                         * play 2 is playing
                         * is original text channel for player 2
                         * is original voice channel for player 2
                         * add music to q2
                         */
                        return q2;
                    } else {
                        /**
                         * player 1 is not playing
                         * play 2 is playing
                         * is original text channel for player 2
                         * not original voice channel for player 2
                         * spawn player 1
                         */
                        return q1; // this would be undefined
                    }
                } else {
                    /**
                     * player 1 is not playing
                     * play 2 is playing
                     * not original text channel for player 2
                     */
                    if (q2.voicechannel == message.voicechannel) { // check if original voice channel for player 2
                        /**
                         * player 1 is not playing
                         * play 2 is playing
                         * not original text channel for player 2
                         * is original voice channel for player 2
                         * ask to head to original text channel
                         */
                        throw Error(`The queue was created in another text channel.\nHead to channel ${q2.data.msgChannel} for music commands.`);
                    } else {
                        /**
                         * player 1 is not playing
                         * play 2 is playing
                         * not original text channel for player 2
                         * not original voice channel for player 2
                         * spawn player 1
                         */
                        return q1; // this would be undefined
                    }
                }
            } else {
                /**
                 * player 1 is not playing
                 * play 2 is not playing
                 * spawn player 1
                 */
                return q1; // this would be undefined
            }
        }
    },
    /**
     * 
     * @param {Object} message the original message instance
     * @param {Object} client the bot client instance
     * @returns queue instance or undefined
     */
    queueCheck(message, client) {
        // check if user is in any voice channel
        const vcChannel = message.member.voice.channel;
        if (!vcChannel) {
            throw new Error("Please join one of the voice channels to play music.");
        }

        // get queue for the guild id
        const queue = client.player.getQueue(message.guild.id);

        if (queue) {
            // check if the message is from the initial message channel
            if (message.channel != queue.data.msgChannel) {
                throw new Error(`The queue was created in another text channel.\nHead to channel ${queue.data.msgChannel} for music commands.`);
            }

            // check if the user is in the same voice channel
            if (vcChannel != queue.connection.channel) {
                throw new Error(`Music is playing in other channel.\nJoin ${queue.connection.channel} or wait for it to finish.`);
            }

            return queue;
        } else {
            return undefined;
        }
    }
}

/**
 * message.guild.members.fetch({user:client1.user.id,withPresences:true})
 * message.guild.members.resolve(user);
 */
