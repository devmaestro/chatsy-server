var socket = io();
var cookies = str_obj(document.cookie);
var url = document.URL.split('/');
var groupId = url[url.length - 1];
socket.on('connect', function ()
{
	socket.emit('join', groupId);
});
socket.on('send message', function (data)
{
	$('#chat-message').append('<div class=\"ui grid\"><div class=\"two wide column\" style=\"font-weight:bold\">' + data.sender + ':</div><div class=\"fourteen wide column\">' + data.message.replace('\n', '<br/>') + '</div></div>');
});
socket.on('send image message', function (data)
{
	$('#chat-message').append('<div class=\"ui grid\"><div class=\"two wide column\" style=\"font-weight:bold\">' + data.sender + ':</div><div class=\"fourteen wide column\"><img style=\"max-width: 25%\" src=\"' + data.message + '\"/></div></div>');
});
$('#chat-input').keydown(function (e)
{
	if (e.keyCode == 13 && !e.shiftKey)
	{
		e.preventDefault();
		if ($('#chat-input').val() != '')
		{
			socket.emit('send message', { 'message': $('#chat-input').val(), 'groupId': groupId, 'sender': cookies['alias'] });
			$('#chat-input').val('');
		}
	}
});

$('#chat-image').on('change', function (e)
{
	var imageFile = e.originalEvent.target.files[0];
	var fileReader = new FileReader();
	fileReader.onload = function (event)
	{
		socket.emit('send image message', { 'message': event.target.result, 'groupId': groupId, 'sender': cookies['alias'] });
	}
	fileReader.readAsDataURL(imageFile);
});

function str_obj(str)
{
	str = str.split(', ');
	var result = {};
	for (var i = 0; i < str.length; i++)
	{
		var cur = str[i].split('=');
		result[cur[0]] = cur[1];
	}
	return result;
}