/**
 * @swagger
 * /channel/get:
 *   get:
 *     summary: Retrieve the lists of channels.
 *     description: Retrieve a list of channels.
 *     responses:
 *       200:
 *         description: A list of channels.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       channelId:
 *                         type: integer
 *                         description: channel id.
 *                         example: 0
 *                       channelName:
 *                         type: string
 *                         description: The name of channel.
 *                         example: 일반 채널
 * /channel/{channelId}/get:
 *   get:
 *     summary: Retrieve the lists of the channel information.
 *     description: Retrieve a list of channel information from channels.
 *     responses:
 *       200:
 *         description: A list of channel information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       channelId:
 *                         type: integer
 *                         description: channel id.
 *                         example: 0
 *                       channelName:
 *                         type: string
 *                         description: The name of channel.
 *                         example: 일반 채널
 *                       isPrivate:
 *                         type: boolean
 *                         description:
 *                         example: true
 *                       userId:
 *                         type: string
 *                         description: The id of users who are in the channel
 *                         example: parkgain
 * /channel/post:
 *   post:
 *     summary: create the channel.
 *     parameters:
 *       schema:
 *       type: integer
 *     description: create the channel.
 *     responses:
 *       200:
 *         description: .
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       channelId:
 *                         type: integer
 *                         description: channel id.
 *                         example: 0
 *                       channelName:
 *                         type: string
 *                         description: The name of channel.
 *                         example: 일반 채널
 * /channel/{channelId}/users/get:
 *   get:
 *     summary: Retrieve the lists of users who are in the channel.
 *     description: Retrieve the lists of users who are in the channel.
 *     responses:
 *       200:
 *         description: A list of channels.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       channelId:
 *                         type: integer
 *                         description: channel id.
 *                         example: 0
 *                       channelName:
 *                         type: string
 *                         description: The name of channel.
 *                         example: 일반 채널
 * /channel/{channelId}/user/post:
 *   post:
 *     summary: add a user to the channel.
 *     parameters:
 *       schema:
 *       type: integer
 *     description: add a user to the channel.
 *     responses:
 *       200:
 *         description: .
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       channelId:
 *                         type: integer
 *                         description: channel id.
 *                         example: 0
 *                       channelName:
 *                         type: string
 *                         description: The name of channel.
 *                         example: 일반 채널
 */
