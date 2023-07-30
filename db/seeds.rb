puts "🌱 seedin' time"

Review.destroy_all
Service.destroy_all
Workspace.destroy_all
WsUser.destroy_all


category = ["Cafe", "Hotel Lobby", "Public Space", "Library", "Resturaunt", "Gym", "Other", "Museum", "Bar", "Coworking Space"]

review_comments = ["Great stuff. It's as if heaven was here on earth!", "Is good ... I guess ... I think.", "My favorite place in the entire world!!!", "Nothin' special. But refills are free so that's cool.", "It's fine -- very OK. I would say it is remarkably middling.", "There are lots of hallways? Nothing else. I think I'm lost. Please help!", "Avoid this dump like the plague.", "This is my NEST. I can't give this place up. They have to kick me out every night. It's the best.", "Lovely decor but wayyy too many rats.", "Cute! But no bathrooms.", "I'm done. Please fix the giant hole in the ceiling.", "I basically finished my degree here. Anyone hiring?", "Cursed! I failed ALL my classes here.", "It feels like I'm spinning in place.", "Literally no tables! Why is it even on this amazing site? PLEASE DELETE!", "Super fancy, but super judgy. Who cares if I'm still running Windows 95? It's none of their business.", "Great!", "Good stuff.", "OK then.", "Pure bad.", "Ughghghgh! Why do I even try. Like most places, it smells like humans.", "NOPE!", "Hell yeah, I met my husband here.", "This is the place.", "Where even am I? Is this a place? How tho is it even?", "GET OUT. They're coming!", "Help, I'm locked in the bathroom!", "Whoaw I kind of love it."]

space_descriptions = ["A cozy, spacious atmosphere with table service.", "All-day New American in the Hyatt serving farmer's market sourced plates & cocktails on tap.", "A sibling of the roving coffee truck, this chill spot also serves American fare & craft beers.", "Basic American eats are served in hearty portions at this retro 24/7 diner.", "Classic comfort eats & free coffee refills are available 24/7 at this no-frills longtime diner.", "Design collection & rotating exhibitions are on display in a historic townhouse.", "Understated diner serving breakfast, meat dishes, pasta & burgers, plus beer & creative cocktails."]

WsUser.create(username: "Guest", password_digest: "password", email: 'haha@haha.com')
WsUser.create(username: "Popo", password_digest: "passwords", email: 'hafa@haha.com')

Workspace.create(title: "David Rubenstein Atrium", address: "61 W 62nd St, New York, NY 10023", lat: 40.77146086611695, lng: -73.98303895282801)
Workspace.create(title: "Empire Hotel", address: "44 W 63rd St., New York, NY 10023", lat: 40.77148524161229, lng: -73.982641985919)
Workspace.create(title: "Bowery Road", address: "132 4th Ave, New York, NY 10003", lat: 40.73327024023306, lng: -73.99017402001607)
# Workspace.create(title: "MUD Cafe", address: "307 E 9th St, New York, NY 10003")
# Workspace.create(title: "Remedy Diner", address: "245 E Houston St, New York, NY 10002")
# Workspace.create(title: "Ripley-Grier Studios", address: "520 8th Ave 16th floor, New York, NY 10018")
# Workspace.create(title: "Galaxy Diner", address: "665 9th Ave, New York, NY 10036")
# Workspace.create(title: "Buunni Coffee - Inwood", address: "4961 Broadway, New York, NY 10034")
# Workspace.create(title: "Cooper Hewitt, Smithsonian Design Museum", address: "2 E 91st St, New York, NY 10128")
# Workspace.create(title: "The Chipped Cup", address: "3610 Broadway, New York, NY 10031")
# Workspace.create(title: "NYPL Schwarzman Building", address: "476 5th Ave, New York, NY 10018")
# Workspace.create(title: "The Viand", address: "517 Columbus Ave, New York, NY 10024")

Workspace.all.each do |workspace|
    Service.create(category: category.sample, wifi: [true, false].sample, description: space_descriptions.sample, workspace_id: workspace.id)
end

Workspace.all.each do |workspace|
    rand(2..8).times do
      user = WsUser.all.sample
      Review.create(
        rating: rand(1..5),
        comment: review_comments.sample,
        workspace_id: workspace.id,
        ws_user_id: user.id
      )
    end
  end
  

puts "✅ done plantin' "
