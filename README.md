# huangziji.github.io

## How to Install NVIDIA Driver on Fedora

1. update kernel
2. reboot and switch to updated kernel
3. install packages from [rpmfusion](https://rpmfusion.org/Howto/NVIDIA)
4. reboot

monitor if akmod is running on background usually it takes 5-10 minutes

    watch 'ps ax|grep kmod'

force akmod to run

    sudo akmods --force
    sudo dracut --force

check if nvidia is successfully installed

    nvidia-smi

## Custom Setup

disable top-left hot corner and installing apps from dnf

    gsettings set org.gnome.desktop.interface enable-hot-corners false
    sudo dnf install gnome-extensions-app gnome-shell-extension-dash-to-dock
    sudo dnf install telegram-desktop transmission qt-creator scrcpy

Apps that I use

- [VLC](https://www.videolan.org/vlc)
- [VSCodium](https://vscodium.com) (clangd, codelldb)
- [Mambaforge](https://github.com/conda-forge/miniforge)
- [Houdini](https://www.sidefx.com)
- [itch.io](https://itch.io/app)

# Useful Commands

dnf query repo info

    dnf repoquery --userinstalled # check user installed packages
    dnf repoquery require foo     # show package requires

find directory, file, text

    find . -name "foo" # find file with keyword foo
    grep -rn foo       # file text from file with keyword foo

alias of the path to your script put it in .bashrc

    alias restapi='sh /path/to/restapi.sh'
    alias wallpaper='sh /path/to/wallpaper.sh'
