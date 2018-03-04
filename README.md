# Anthem ( A simple theme of Ghost)
**adapt to Ghost 1.0

[Demo](http://www.anmane.com/).

Cause of the theme adding a helper to show Post's TOC. You need to 
 1. Add a line in the *Ghost_Path*/index.js

    // Add this into Ghost_Path/index.js
    require('./content/themes/anthem/helpers/anthem_toc')():
    
 2. Add the new helper name into checklist. (Ghost will check whether there is any unknown helper.)
 
    // Add the helper name in Ghost_Path/node_module/gscan/lib/spec.js which is looked like:
    knowHelpers=['foreach',.......,'anthem_toc'];

 3. restart the server.
 
 
**Tips:** By the same method, you can add your own helper to themes.(I think it's stupid to prevent users to add their own helpers.)

1. Write the helper js file with the register method.
(Ghost server's helpers are located in *core/server/helpers/\*\*.js*, which are registered by *core/server/helpers/index.js*.  Custom helper should register itself if you don't what to modified the server file.

2. Add the new helper into checklist which is located in Ghost_Path/node_module/gscan/lib/spec.js
  
  
