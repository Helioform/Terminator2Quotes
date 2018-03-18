var c, ctx;
var w, h;
var cursor, posX, posY, t2QuoteLine, currentQuote, line, charCount, lastCharCount, totalCharCount;
var fontSize;
var theme;
var introDone, randomQuoteStarted, randomQuoteDone;

const t2Quote = "Sarah Connor: [narrating] Three billion human lives ended on August 29, 1997. The survivors of the nuclear fire called the war Judgment Day. They lived only to face a new nightmare, a war against the machines. The computer which controlled the machines, Skynet, sent two terminators back through time. Their mission: to destroy the leader of the human Resistance. John Connor; my son. The first terminator was programmed to strike at me, in the year 1984, before John was born. It failed. The second was sent to strike at John himself, when he was still a child. As before, the Resistance was able to send a lone warrior. A protector for John. It was just a question of which one of them would reach him first.";

const t2Quotes = ["The Terminator: My CPU is a neural-net processor; a learning computer. The more contact I have with humans, the more I learn.", "Sarah Connor: Watching John with the machine, it was suddenly so clear. The terminator, would never stop. It would never leave him, and it would never hurt him, never shout at him, or get drunk and hit him, or say it was too busy to spend time with him. It would always be there. And it would die, to protect him. Of all the would-be fathers who came and went over the years, this thing, this machine, was the only one who measured up. In an insane world, it was the sanest choice.", "Sarah Connor: [narrating] The unknown future rolls toward us. I face it, for the first time, with a sense of hope. Because if a machine, a Terminator, can learn the value of human life, maybe we can too.", "Dr. Silberman: I'm sure it feels very real to you. Sarah Connor: On August 29th, 1997, it's gonna feel pretty fucking real to you too. Anybody not wearing 2 million sunblock is gonna have a real bad day. Get it?", "John Connor: Can you learn stuff you haven't been programmed with so you could be... you know, more human? And not be such a dork all the time? The Terminator: My CPU is a neural-net processor; a learning computer. But Skynet presets the switch to read-only when we're sent out alone. Sarah Connor: Doesn't want you doing too much thinking, huh? The Terminator: No.", "The Terminator: In three years, Cyberdyne will become the largest supplier of military computer systems. All stealth bombers are upgraded with Cyberdyne computers, becoming fully unmanned. Afterwards, they fly with a perfect operational record. The Skynet Funding Bill is passed. The system goes online August 4th, 1997. Human decisions are removed from strategic defense. Skynet begins to learn at a geometric rate. It becomes self-aware at 2:14 a.m. Eastern time, August 29th. In a panic, they try to pull the plug. Sarah Connor: Skynet fights back. The Terminator: Yes. It launches its missiles against the targets in Russia. John Connor: Why attack Russia? Aren't they our friends now? The Terminator: Because Skynet knows that the Russian counterattack will eliminate its enemies over here.", "The Terminator: Hasta la vista, baby.", "The Terminator: I'll be back.", "John Connor: The whole thing goes: The future's not set. There's no fate but what we make for ourselves.", "John Connor: Jesus, you were gonna kill that guy. The Terminator: Of course; I'm a Terminator.", "The Terminator: I swear I will not kill anyone.", "[One-armed and battered after confronting the T-1000] The Terminator: I need a vacation.", "John Connor: No, no, no, no. You gotta listen to the way people talk. You don't say \"affirmative,\" or some shit like that. You say \"no problemo.\" And if someone comes on to you with an attitude you say \"eat me.\" And if you want to shine them on it's \"hasta la vista, baby.\" The Terminator: Hasta la vista, baby. John Connor: Yeah but later, dickwad. And if someone gets upset you say, \"chill out\"! Or you can do combinations. The Terminator: Chill out, dickwad. John Connor: Great! See, you're getting it! The Terminator: No problemo.","The Terminator: I need your clothes, your boots and your motorcycle. Cigar Biker: You forgot to say please...", "The Terminator: Why do you cry? John Connor: You mean people? The Terminator: Yes. John Connor: I don't know. We just cry. You know, when it hurts. The Terminator: Pain causes it? John Connor: No, it's when there's nothing wrong with you, but you hurt anyway. You get it? The Terminator: No.", "John Connor: We've got company!... Police! Sarah Connor: How many? John Connor: Uh... all of 'em, I think.", "John Connor: You just can't go around killing people. The Terminator: Why? John Connor: What do you mean why? 'Cause you can't. The Terminator: Why? John Connor: Because you just can't, okay? Trust me on this.", "The Terminator: I know now why you cry [wipes a tear from John's face] The Terminator: but it's something that I can never do."];

window.onload = init;

function init() 
{
    c = document.querySelector('canvas');
    ctx = c.getContext('2d');
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    w = c.width;
    h = c.height;
    cursor=posX=line=charCount=totalCharCount=0;
    lastCharCount=findCharCount(t2Quote, w);
    posY = 100;
    fontSize = 0.03*h;
    introDone=randomQuoteDone=false;
    theme = document.getElementById("theme");
    theme.volume = 0.5;
    theme.play();
    setInterval(loop,120);   
}

function drawText(s, x, y)
{
    ctx.fillStyle="rgba(255,255,255,0.9)";
    ctx.font=fontSize+"px System"; 
    ctx.fillText(s, x, y);
}

function measureString(s, c)
{
    var textWidth=0;
    
    for(i=0;i<c;i++)
        textWidth+=ctx.measureText(s[i]).width;
    
    return textWidth;
}

function findCharCount(s, border)
{
    var count=0, x=0, pos=0;
     
    while(x <= border)
    {        
        x=measureString(s,pos);
        count++;
        pos++;
    }
    
    return count;
}

function drawChar(text)
{
    var outText="";
   
    if(text[cursor] != undefined)
        outText+=text[cursor];
    
    posX = measureString(text, cursor);
    
    if(posX >= w - 2*fontSize)
    {
        line+=charCount;
        posX=0;
        posY+=fontSize;
        cursor=0;
        lastCharCount=charCount;
        charCount=0;
    }
   
    drawText(outText, posX, posY);
}

function loop()
{
    if(!introDone)
        currentQuote = t2Quote;
    else 
    {
       if(!randomQuoteStarted)
       {
            currentQuote = t2Quotes[Math.floor(Math.random()*t2Quotes.length)];
            randomQuoteStarted = true;
            randomQuoteDone = false; 
            lastCharCount = 100;
       }            
    }    
    
    t2QuoteLine = currentQuote.substring(line, lastCharCount+line);
    var i=0;
    
    while(t2QuoteLine[i] != undefined)
        t2QuoteLine = currentQuote.substring(line, line+lastCharCount+i++);
        
    drawChar(t2QuoteLine); 
    cursor++;
    charCount++;
    totalCharCount++;
   
    if(totalCharCount > currentQuote.length)
    {
        ctx.clearRect(0,0,w,h);        
        line = 0;
        cursor = 0;
        posX = 0;
        posY = 100;
        totalCharCount = 0;
        charCount = 0;
        if(!introDone)
            introDone = true;
        if(!randomQuoteDone)
        {
            randomQuoteDone = true;
            randomQuoteStarted = false;
        }
    }
    
   
}

