/* 
==============================
=  Collection: Chats         =
=   + participants: [userId] =
=   + dateCreated: Date      =
=   + messages: [{           =
=       + date: Date         =
=       + from: userId       =
=       + to: userId         =
=       + message: String    =
=	}]                       =     
==============================
*/

Chats = new Meteor.Collection('chats');