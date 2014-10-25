var socket = io();
$('#creategroup-button').click(function ()
{
	$('#creategroup-modal').modal('show');
});

	$(document).on('click',"div[id^='joingroup-'][id$='-button']",function ()
	{
			var groupId = $(this).attr('id').split('-')[1];
			if ($('#joingroup-' + $(this).attr('id').split('-')[1] + '-passkey-input').length == 0)
			{
				window.location.href = "/groups/" + $(this).attr('id').split('-')[1];
			}
			else
			{
				$.ajax(
				{
					url: '/joinauth',
					type: 'POST',
					data: {
						'groupId': $(this).attr('id').split('-')[1],
						'passkey': $('#joingroup-' + $(this).attr('id').split('-')[1] + '-passkey-input').val()
					},
					success: function (data, status, jqXHR)
					{
						console.log(data);
						console.log(status);
						if (data == "Success")
						{
							window.location.href = "/groups/" + groupId;
						}
					}
				});
			}

		});
	
$('#creategroup-modal-submit').click(function ()
{
	var cookies = str_obj(document.cookie);
	if ($('#creategroup-key-input').val() != "" && $('#creategroup-key-input').val() != undefined)
	{
		if ($('#creategroup-visibility-checkbox').prop('checked'))
		{
			var postData = {
				'alias': cookies['alias'],
				'name': $('#creategroup-name-input').val(),
				'description': $('#creategroup-description-input').val(),
				'key': $('#creategroup-key-input').val(),
				'isPrivate': true,
				'isVisible': true
			}
		} else
		{
			var postData = {
				'alias': cookies['alias'],
				'name': $('#creategroup-name-input').val(),
				'description': $('#creategroup-description-input').val(),
				'key': $('#creategroup-key-input').val(),
				'isPrivate': true,
				'isVisible': false
			}
		}
	} else
	{
		if ($('#creategroup-visibility-checkbox').prop('checked'))
		{
			var postData = {
				'alias': cookies['alias'],
				'name': $('#creategroup-name-input').val(),
				'description': $('#creategroup-description-input').val(),
				'key': $('#creategroup-key-input').val(),
				'isPrivate': false,
				'isVisible': true
			}
		} else
		{
			var postData = {
				'alias': cookies['alias'],
				'name': $('#creategroup-name-input').val(),
				'description': $('#creategroup-description-input').val(),
				'key': $('#creategroup-key-input').val(),
				'isPrivate': false,
				'isVisible': false
			}
		}
	}
	$.ajax({
		type: 'POST',
		url: '/groups/create',
		data: postData,
		success: function (data, status, jqXHR)
		{
			if (status === "success")
			{
				$('#creategroup-modal').modal('hide');
			} else
			{
				//Error handling
			}
		}
	});
});

$('#createdgroups-button').click(function ()
{
	var cookies = str_obj(document.cookie);
	$('#browsegroups-container').hide();
	$('#createdgroups-container').show();
	$.ajax(
	{
		url: '/groups/created',
		type: 'POST',
		data:
		{
			'alias': cookies['alias']
		},
		success: function (data, status, jqXHR)
		{
			for (var i = 0; i < data.length; i++)
			{
				if (data[i].isPrivate)
				{
					$('#createdgroups-list').append('<div class="row"><div class="twelve wide column"><p class="ui header">' + data[i].name + '</p><p>' + data[i].description + '</p></div><div class="four wide column" style="text-align: right"><div class="ui action input"><input type="password" id="joingroup-' + data[0]._id + '-passkey-input" placeholder="Passkey"/><div class="ui button teal" id="joingroup-' + data[0]._id + '-button">Join</div></div></div>');
					$('#createdgroups-list').append('<div class="row" style="margin:0; padding:0"><div class="sixteen wide column" style="text-align: right"><div class="ui red button" style="margin-left:0.2rem" id="block-'+data[0]._id+'-button">Block</div><div class="ui green button" style="margin-left:0.2rem"  id="invite-' + data[0]._id +'-button">Invite</div><div class="ui button" style="margin-left:0.2rem" id="settings-'+data[0]._id + '-button">Settings</div></div>');
					$('#createdgroups-list').append('<div class="ui divider"></div>');
				} else
				{
					$('#createdgroups-list').append('<div class="row"><div class="twelve wide column"><p class="ui header">' + data[i].name + '</p><p>' + data[i].description + '</p></div><div class="four wide column" style="text-align: right"><div class="ui button teal" id="joingroup-' + data[0]._id + '-button">Join</div></div>');
					$('#createdgroups-list').append('<div class="row" style="margin:0; padding:0"><div class="sixteen wide column" style="text-align: right"><div class="ui red button" style="margin-left:0.2rem" id="block-'+data[0]._id+'-button">Block</div><div class="ui green button" style="margin-left:0.2rem"  id="invite-' + data[0]._id +'-button">Invite</div><div class="ui button" style="margin-left:0.2rem" id="settings-'+data[0]._id + '-button">Settings</div></div>');
					$('#createdgroups-list').append('<div class="ui divider"></div>');
				}
			}
		}
	});
});

$('#browsegroups-button').click(function ()
{
	window.location.href = "/home";
});

function str_obj(str)
{
	str = str.split('; ');
	var result = {};
	for (var i = 0; i < str.length; i++)
	{
		var cur = str[i].split('=');
		result[cur[0]] = cur[1];
	}
	return result;
}