json.content @message.content
json.image @message.image.url
json.user_id current_user.id

json.user do
  json.name @message.user.name
end

json.time @message.created_at.strftime("%Y/%m/%d %H:%M")