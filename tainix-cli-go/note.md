Extrait de page 
```html

                            <p class="h3 mt-4">Réponse attendue</p>

                                                            <p>DESTROY_58</p>
                                                        <p class="h3">Déroulé étape par étape</p>

                            <p><span style="display: inline-block; background: #2c7be5; width: 13px; height: 13px; border-radius: 10px;"></span> &nbsp;  Il y a <b>15</b> robots réglés sur l'opération <b>HEAL</b>.<br /><span style="display: inline-block; background: #F85559; width: 13px; height: 13px; border-radius: 10px;"></span> &nbsp;  Il y a <b>58</b> robots réglés sur l'opération <b>DESTROY</b>.<br /><span style="display: inline-block; background: #2FD18D; width: 13px; height: 13px; border-radius: 10px;"></span> &nbsp;  Il y a <b>14</b> robots réglés sur l'opération <b>CREATE</b>.<br /><span style="display: inline-block; background: #f1c40f; width: 13px; height: 13px; border-radius: 10px;"></span> &nbsp;  Il y a <b>14</b> robots réglés sur l'opération <b>PRESERVE</b>.<br /></p>
                        </div>

                        <hr class="mt-8" />
```

Pour choper que la partie avec les steps:
```
Déroulé étape par étape<\/p>\s*<p><span\s+[\w\s=":;#-]+><\/span>(.*?)<\/p>
```
=>
```html
&nbsp;  Il y a <b>15</b> robots réglés sur l'opération <b>HEAL</b>.<br /><span style="display: inline-block; background: #F85559; width: 13px; height: 13px; border-radius: 10px;"></span> &nbsp;  Il y a <b>58</b> robots réglés sur l'opération <b>DESTROY</b>.<br /><span style="display: inline-block; background: #2FD18D; width: 13px; height: 13px; border-radius: 10px;"></span> &nbsp;  Il y a <b>14</b> robots réglés sur l'opération <b>CREATE</b>.<br /><span style="display: inline-block; background: #f1c40f; width: 13px; height: 13px; border-radius: 10px;"></span> &nbsp;  Il y a <b>14</b> robots réglés sur l'opération <b>PRESERVE</b>.<br />
```

Ensuite on peut replace les balises html par du vide
```
<\/?\w+\s*(?:[\w\s=":;#-]+)?\/?>
```
=>
```html
&nbsp;  Il y a 15 robots réglés sur l'opération HEAL. &nbsp;  Il y a 58 robots réglés sur l'opération DESTROY. &nbsp;  Il y a 14 robots réglés sur l'opération CREATE. &nbsp;  Il y a 14 robots réglés sur l'opération PRESERVE.
```

Plus qu'a split `&nbsp` et c'est reglé

