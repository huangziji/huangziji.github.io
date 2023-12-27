#!bin/bash
# change to a random wallpaper on my gnome desktop

# shopt -s nullglob
dir=~/Pictures/Wallpapers

# store all the image file names in wallpapers array
content=("$dir"/*.jpg "$dir"/*.png)

# get random index within wallpapers size
let i0=$RANDOM%${#content[*]}
let i1=(i0+1000)%${#content[*]}

# set wallpaper to designated filename
gsettings set org.gnome.desktop.background picture-uri ${content[$i0]}
gsettings set org.gnome.desktop.background picture-uri-dark ${content[$i1]}

# switch to dark mode
# gsettings set org.gnome.desktop.interface color-scheme prefer-dark
