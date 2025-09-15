<?php

namespace Database\Seeders;

use Database\Factories\PostFactory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        PostFactory::new()
            ->published()
            ->create([
                'title' => $title = 'Hello World!',
                'slug' => Str::slug($title.'-'.Str::random(7)),
                'excerpt' => 'My first blog post but who gives a shit about it?',
                'cover' => 'https://images.unsplash.com/photo-1535551951406-a19828b0a76b?q=80',
                'content' => <<<'EOF'
This is the first blog post of a serie of blog posts that I will try to do without any guarantees because 1) I don't like blogging very much 2) I
don't have much to write anyway. I don't even know what to post and when to post, my blog won't have a category, nor a schedule I will just post
whenever I feel like I want to write something for some reason.

## Me

My website is pretty new, but it's not the first attempt to have a personal website/blog/whatever. I had another website under another domain, it
was built in 2010 and it was ugly as fuck but it worked for a bit until I tried to experiment with Google ADS and I fucked it real bad 😁
After that experience I gave up on a personal website because well social media were the hot thing in town, so I hopped onto the bandwagon of that
and oh boy it was a mistake.
With the insight of today I can safely say that **social media are a cancer to society**; I hate them all! Even Twitter — which is the only one I
use now primarily to troll and talk about Bitcoin (but trolling is the main thing). Social media drains your soul and your willpower makes you
more toxic and less productive and also your _personalized_ feed is not personalized at all, it's just tailored to exploit you emotionally and
sell advertisements to you.</br>
So through the years I became more privacy aware and I had to swallow some huge red pills about how the world, and internet, works so yes I started
to use social media less and less eventually I've leveraged the power of GDPR to nuke my accounts completely resolving most of my problems and now
I can say I live happily without Facebook, Google (gmail and search), Instagram, Snapchat, Reddit and whatever other social media you can think of
aside from the mentioned Twitter but I keep the usage to a minimum probably I'll delete that too soner or later.

## Takeaways

Writing is not my thing, you can clearly verify that by the quality of my posts 😂. I'll try to be consistent but this is not a blog, it's more
like a diary for me. So expect confused posts, non linear posting, rants about anything and technical stuff.
EOF,
                'published_at' => Date::create(2022, 1, 3),
            ]);

        PostFactory::new()
            ->published()
            ->create([
                'title' => $title = 'My Story',
                'slug' => 'my-story-aj4910245',
                'excerpt' => 'I am part of the ‘90s generation that grew up with the Fresh Prince of Bel Air and the Commodore 64',
                'cover' => 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80',
                'content' => <<<'EOF'
Being self-taught, I believe in life-long learning and knowledge sharing.
I also deeply believe in the open-source movement and try to give back to the community whenever I can.

I am part of the ‘90s generation that grew up with the Fresh Prince of Bel Air and the Commodore 64.

Understanding how stuff works is a passion that I showed since the age of 5,
in fact I tried to assemble and disassemble both Commodore and Amiga with very positive results,
but with a lot of anger as well.

It was caused by the fact that the more parts I discovered, the more I could not understand how they worked.

When I grew up, lots of things became clearer and the field of computer science became my main passion.

I started to get closer to the art of programming relatively late, around 16 years old, before,
I dabbled only in programming micro C software on consoles, nothing important.

The hard programming began exactly when I was 16. After that,
I took a diploma in computer science in Italy then I started to study computer engineering in Switzerland at SUPSI
where I learnt a lot of basic essential techniques for a good engineer.

I'm deeply proud of my work and I strongly believe in continuous formation because technology never stops and I will not ever let it go too far from my passion.
EOF,
                'published_at' => Date::create(2022, 2, 1),
            ]);

        PostFactory::new()
            ->published()
            ->create([
                'title' => $title = 'Teach your kids about money',
                'slug' => Str::slug($title.'-'.Str::random(7)),
                'excerpt' => 'What we become in life is largely determined by our childhood',
                'cover' => 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?q=80',
                'content' => <<<'EOF'
As adults, we earn, save and invest out money in different ways. Some of us are more lucky than others, maybe more careful and pragmatic when it
comes to investing. And some of us are pure speculators. Either we don't save and leave everything to the future, or we save and speculate without
savings by hoping on a promise fast returns. At the end the way we handle our money in our working life determines how well (or worse) we will be
after we retire.

It's hard for us to imagine a tough financial life for ourselves in our _golden_ years, even worse when we think of our children whom we care for
and love so much but, for whatever reason, we don't teach them what really matters. So why not take every opportunity to teach our children the
value of money early in their lives? Why not teach them to lead a disciplined life when it comes to treating the money you earn, or they will earn?

The question is: **how do we do that?** How to teach our children the value of money, saving and investing? Those are not common habits and
usually no one learn them anyway 🤔.

In this blog post I will try to set up a simple framework, based on 3 fundamental rules, that you can apply to your teaching journey.

## 1 Money is earned by hard work

My sisters used to believe early that money was simply something my parents had, that they could get them somehow but it wasn't clear to them from
when money comes from. They later discover that each single penny my parents used was hard earned by them usually by exchanging their time by
working. It's important to tell your children that every single paper bill you have is actually coming from hard work, unless you are a thief or a
politician.

Also tell them that if they continue to expect dad, or mom, to meet their never ending desires, you will one day run out of all money to meet
their needs in the future!

## 2 The Virtues of Saving and Investing

Saving is a virtue, the benefits of which we realize only if we have a low time preference ,even if in today economy saving has become more of a
fairytale than anything else but this is a discussion worth for another time, anyway it's important for you to make sure your children start early
on this front. This could even help you 😁.

Teach your kids that there's more to money than just spending it and lead them by example through your own saving habits, if you have hopefully...
So if your kid wants to buy something new and shiny, especially if his friends have it, ask him what's the cost of it and how much he would need
to save every month or week to reach that target. If he understands this simple principle, he will easily recognize the virtue of saving to meet a
future spending goal.

> Hopefully he/she realizes that the more she saves the better the future purchasing power will be

Of course saving is simple to teach, or at least it's easier than investing that's why teaching investing can be quite cumbersome if your kid is
too young to understand certain principles. Nonetheless, there will come a point when he will be ready and so do you. Investing helps us marking
money from our money, is this clown economy investing has become the sole way of keeping up with inflation and then make some money but again this
is a topic for another time. Investing is like planting a tree, watching it grow slowly, and then enjoying the fruits it bears. Teach your kids
the simple principles of interest and the power of compounding as they grow, they will find it more interesting that you might expect!

Saving and investing will help them understand how they can meet their future finance goals while, at the same time, they will experience a sense
of fulfilment and joy watching their wealth growing with time.

## 3 The dangers of debt

This lesson is one of the crucial and probably most compilated one so your kid will probably be more like a teenager when he will be ready to hear
this stuff. So you are a parent of a teenager, discuss thing like loans, credit cards and other form of debts. If you want her to learn by doing,
you can have her take out a small personal loan to purchase something that she wants and she would gladly agree on this, be clear about that she
must repay the loan out of her pocket money.

She will soon realize that making regular debts and interest payments is not funny at all but also she will realize that perpetual debt will
shrink her purchasing ability with time.

### Takeaways

Teaching your kids about money is a controversial subject, it's important to let them be aware of how money works but the problemi is how to teach
them the proper way. In general I reccomend a few guiding principles you can use to effectively teach your children about money:

1. **Educate yourself**: It's dangerous to teach something you first don't know. Learn as much as you can aboud saving, investing, managing
   expensese and reducing debt. You can then become the best teacher for your kids

2. **Lead by example**: Kids don't understand fully when you tell them thing. Instead they will be able to assimilate more when you show them
   things, so you if are teaching them about saving but you do the complete opposite well... that doesn't work very much

3. **Teach slowly**: You have taken years to learn about money then you should not expect your kids to learn everything in a couple of random
   discussion at the dinner table. Your goal should be to teach them the above, and other, lessons on money over the course of their childhood and
   adolescence.

Teaching your children the value of money is very important for their financial future. Inspire them!
EOF,
                'published_at' => Date::create(2022, 3, 1),
            ]);
    }
}
